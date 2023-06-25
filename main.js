var status = "";
var percent = 0;
objects = [];

const alertSound = document.getElementById('alertSound');

function setup() {
    canvas = createCanvas(380, 380);// to create the canvas
    canvas.center();// to center align the camvas
    video = createCapture(VIDEO); // video
    video.size(380, 380); // set video size
    video.hide(); // hide video
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);// implemte the object detection model
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw() {
    image(video, 0, 0, 380, 380);// to get image in canvas

    if(status != "") {
        objectDetector.detect(video, gotResult);
        
        r = random(255);
        b = random(255);
        g = random(255);
        if(objects.length == 0){
            console.log("Not obj")
            document.getElementById("status").innerHTML = "Status : Object Not Detected";
            document.getElementById("statusFound").innerHTML = "Baby Not found";
            alertSound.play();
        }else{
        for(i=0;i < objects.length;i++) {
            if(objects[i].label == "person") {            
                    alertSound.pause();
                    document.getElementById("status").innerHTML = "Status : Object Detected";
                    document.getElementById("statusFound").innerHTML = "Baby Found";       
                    percent = floor(objects[i].confidence* 100);
                    fill(r, g, b);// to set text color to red
                    text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);// to display text in canvas
                    noFill();
                    stroke(r, g, b);
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }else {
                console.log("Not person");
                document.getElementById("status").innerHTML = "Status : Object Not Detected";
                document.getElementById("statusFound").innerHTML = "Baby Not found";
                alertSound.play();                
            }
        }
    }
  }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}