song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songStatus = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is initialised');
}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    songStatus = song1.isPlaying();
    if(scoreLeftWrist > 0.2)
    {
     circle(leftWristX, leftWristY,20);
     song1.stop();
     if(songStatus == false)
     {
       song2.play();
        document.getElementById("song").innerHTML = "The second song is playing!";

     }
     if(scoreRightWrist > 0.2)
     {
        circle(leftWristX, leftWristY,20);
        song2.stop();
        if(songStatus == false)
     {
       song1.play();
        document.getElementById("song").innerHTML = "The first song is playing!";

     }
     }
    }
     

    
}

function play()
{
    song1.play();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX  = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX  = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
