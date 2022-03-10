status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : Detecting Objects";
    object_name=document.getElementById("input").value;
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objects_status").innerHTML=input+" found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(input+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objects_status").innerHTML=input+" not found"
            }
        }
    }
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
    console.log(results);
    objects=results;
}
}