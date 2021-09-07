
status = "";
object = [];

function preload() {
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    img=createCapture(VIDEO);
    img.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded() {
    console.log("Model is loaded!#");
    status = true;
    objectDetector.detect(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 400);

    if (status != "") {
        r=random(255);

        g=random(255);

        b=random(255);

        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status :Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects : " + object.length;

            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            rect(object[i].x, object[i].y, object[i].width-50, object[i].height-50);
        }
    }

}