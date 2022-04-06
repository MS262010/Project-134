function setup() {
    canvas = createCanvas(380, 380);
    canvas.position(580, 250);
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
    console.log('Setup Done');
}
status = "";
img = "";
objects = [];
baby_found=0;

function preload() {
    alarm = loadSound("Alert.mp3");
}
function draw() {
    image(video, 0, 0, 380, 380);
    
    if (status != "") {
        objDetect.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            
            document.getElementById("Status").innerHTML = "Status : Objects Detected";
            if(objects[i].label=="person"){
             baby_found=1;
             document.getElementById("obj_found").innerHTML = "Baby Found";
             alarm.stop();
            }
            else {
                document.getElementById("Status").innerHTML = "Status : Objects Detected";
                document.getElementById("obj_found").innerHTML = "Baby Not Found";
                alarm.play();
            }
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded() {
    console.log('Model Loaded!');
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}