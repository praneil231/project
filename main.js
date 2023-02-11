song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWhristY = 0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
if(scoreRightWrist > 0.2)
{
    circle(rightWristX,rightWhristY,20);

    if(rightWhristY >0 && rightWhristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWhristY >100 && rightWhristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rightWhristY >200 && rightWhristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1.5);
    }

    else if(rightWhristY >300 && rightWhristY <=400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
}

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHtml = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);  
}
function preload()
{
    song = loadSound("music.mp3");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results [0].pose.rightWrist.x;
        rightWhristY = results [0].pose.rightWrist.y;
        console.log("leftWristX = "+ leftWristX +" leftWristY = "+ leftWristY);
    }
}