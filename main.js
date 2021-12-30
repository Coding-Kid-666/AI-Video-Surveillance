video = "";

objects = [];
current_status = false;

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (current_status == true) {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status_now").innerHTML = "Status:Objects detected.";
            document.getElementById("number_thing").innerHTML = "Number of objects detected are - " + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", object[i].x + 15, objects[i].y + 15);

            stroke("#09ff00");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function start_something() {
    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_now").innerHTML = "Status:Firing up ObjectDetector_Model-2290";  
}

function modelLoaded(){
    console.log("CoCoSSD has sucessfully loaded.");
    current_status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
    if (error) {
        console.error(error);
        document.getElementById("status_now").innerHTML = "Status: Error. ObjectDetector_Model-2290 powering down."
    } else {
        console.log(results);
        objects = results;
    }
}

