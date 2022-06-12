song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score = "";

function preload(){
    song = loadSound("music.mp3");
 }

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(480,200);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function  gotPoses(results){
if(results.length > 0){
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY + "rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    score = results[0].pose.keypoints[9].score;
}

}

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("black");
    stroke("black");

    circle(leftWristX, leftWristY, 10);
    if(score > 0.2){
        no_leftWristY = Number(leftWristY);
        remove_decimal = floor(no_leftWristY);
        volume = remove_decimal/1000;
        volume1 = volume*2
        song.setVolume(volume1);
        document.getElementById("volume").innerHTML = "Volume = " + volume1;
    }

}

function play_button(){
    song.play();
    song.setVolume(1);
    song,rate(1);
}
