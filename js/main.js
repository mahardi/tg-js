let cols;
let rows;
let w = 1000;
let h = 1000;
let scale = 20;
let flying = 0;
let terrain;

function setup(){
    let arr = new Arrays();
    let canvas = createCanvas(400,400,WEBGL);
    canvas.parent("canvas");

    cols = (w/scale)/2;    
    rows = (h/scale)/2;    

    terrain = arr.create2DArray(cols*2); 
}

function draw(){
    flying -= 0.05;

    generateTerrain(rows,cols,terrain);

    background(220);
    stroke(0);
    noFill();
    rotateX(PI/3);

    drawTerrain(rows,cols,terrain);
}

function generateTerrain(rows,cols,terrain){
    let yoff = flying;
    for(let i = 0; i< (rows*2); i++){
        let xoff = 0;
        for(let j = 0; j < (cols*2) ; j++){
            terrain[i][j]= map(noise(xoff,yoff),0,1,-100,100);
            xoff += 0.1;
        }
        yoff += 0.1;
    }
}

function drawTerrain(rows,cols,terrain){
    let i = 0; 
    for(let y = -rows; y < rows ; y++){
        let j = 0;
        beginShape(TRIANGLE_STRIP);
        for(let x = -cols; x < cols ; x++){
            vertex(x*scale, y*scale, terrain[i][j]);
            vertex(x*scale, (y+1)*scale,  terrain[i][j+1]);
            j++;
            j = checkIfOver(j);
        }
        i++;
        i = checkIfOver(i);
        endShape();
    }
}

function checkIfOver(x){
    if(x == Math.floor(cols*2+1) || x == Math.floor(rows*2+1)){
        return 0;
    }else {
        return x;
    }
}
