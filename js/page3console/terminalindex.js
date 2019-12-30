const constraints =  { "video": { width: { exact: 320 }}};
var videoTag = document.getElementById('video-tag');
var videoTag1 = document.getElementById('video-t');
var imageTag = document.getElementById('image-tag');
var zoomSlider = document.getElementById("zoom-slider");
var zoomSliderValue = document.getElementById("zoom-slider-value");
var imageCapturer;
var pastCmds = [];
var pastCmdsIndex = -1;
var loginProgress = 0;
var userName;

$(function(){
	$(".console-text").focus();
  
  $(document).on('keyup', '.console-text', function(e) {
    if (e.keyCode === 13) {
      if(pastCmdsIndex >= 0){
        pastCmds.splice(pastCmdsIndex, 1);
      }
      
      pastCmdsIndex = -1;
      pastCmds.unshift($(this).val());
      commandHandler($(this).val());
      $(this).val("");
    }
    else if(e.keyCode === 38){
      if(pastCmdsIndex + 1 < pastCmds.length){
        pastCmdsIndex++;
        $(this).val(pastCmds[pastCmdsIndex]);
        $(this).focus().val($(this).val());
      }
    }
    else if(e.keyCode === 40){
      if(pastCmdsIndex -1 > -2){
        if(pastCmdsIndex == -1){
          $(this).val("");
        }
        else{
          pastCmdsIndex--;
          $(this).val(pastCmds[pastCmdsIndex]);
          $(this).focus().val($(this).val());
        }
      }
    }
  });
  
  $(".console").click(function() {
    $(".console-text").focus();                
  });
  
  
});

function appendCMsg(txt){
  $(".console-type").before( "<div class='console-msg'>"+ txt +"</div>" );
}

function appendCError(txt){
  $(".console-type").before( "<div class='console-msg console-error'>"+ txt +"</div>" );
}

function commandHandler(txt){
  if(loginProgress>0){
    if(loginProgress==1){
      appendCMsg("//> " + txt);
      userName=txt;
      loginProgress=2;
      appendCMsg("password:");
      $(".console-text").attr('type', 'password');
    }
    else{
      console.log("pass: " + txt);
      cmdClear();
      appendCMsg("&nbsp;");
      appendCMsg("Welcome back " + userName +"!");
      appendCMsg("&nbsp;");
      $(".console-text").attr('type', 'text');
      loginProgress=0;
    }
  }
  else{
    appendCMsg("//> " + txt);
    if(txt == "help"){
      cmdHelp();
    }
    else if(txt == "clear"){
      cmdClear();
    }
    else if(txt == "clock"){
      cmdClock();
    }
    else if(txt == "contact"){
      cmdPing();
    }
    else if(txt == "about"){
      cmdLogin();
    }
      else if(txt == "mirror"){
      start();
      }
      else if(txt == "selfie"){
      takePhoto();
      }
    else{
      appendCError("command not found: "+ txt);
      appendCMsg("for more info type 'help'");
      appendCMsg("&nbsp;");
    }
    $('.console').scrollTop($('.console')[0].scrollHeight);
  }
  
}

function cmdHelp(){
     appendCMsg("about&emsp;- &emsp;About the Developer");
    appendCMsg("contact&emsp;- &emsp;Contact Information of Developer");
  appendCMsg("clear&emsp;- &emsp;clears the command window");
    appendCMsg("mirror&emsp;- &emsp;watch yourself in selfie-camera");
     appendCMsg("selfie&emsp;- &emsp;capture your selfie, after opening the mirror");
  appendCMsg("clock&emsp;- &emsp;returns the current time");
 
  appendCMsg("&nbsp;");
}

function cmdClear(){
  $(".console-msg").detach();
    location.reload();
}

function cmdClock(){
  var time = new Date();
  appendCMsg(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
  appendCMsg("&nbsp;");
}

function cmdPing(){
     
  appendCMsg("Email:&nbsp;divijpatel95@gmail.com");
  appendCMsg("&nbsp;");
    var str = "Click ON Me to Find the Location.";
  var result = str.link("https://www.google.com/maps/place/458+James+St+N,+Thunder+Bay");

   appendCMsg(result);
    appendCMsg("&nbsp;");
    var str1 = "Click On me to find me on facebook";
     
   var result1 = str1.link("https://www.facebook.com/DivijP95","_blank");
    appendCMsg(result1);
    appendCMsg("&nbsp;");
    
     var str2 = "Click On me to find me on Linked-in";
     
   var result2 = str2.link("https://www.linkedin.com/in/divij-patel-b5859a103");
    appendCMsg(result2);
    appendCMsg("&nbsp;");
    
}

function cmdLogin(){
  appendCMsg("Divij H. Patel&emsp;-&emsp; was born in Nadiad, Gujarat, India in 1995. He Received a bachelor’s degree in computer engineering (2017) from Gujarat Technological University, Gujarat, India.  Now he is completing the postgraduate certification in ‘Information and Communication Technology Solution for Small Businesses’ from Confederation College, Thunder Bay(ON), Canada. During the engineering period, he researched numerous topics and published three research papers with different international American and Indian journals mentioned below. The first research paper is “Spyware Triggering System with the Particular String Value,” the second one is “Multipurpose Reminder System.” Both papers published with International Journal of Engineering Research and Development. The third one is “Copy-Paste Command with Additional Facilities” published with International Journal of Computer Applications, New York, USA. Also, he has been filled three patents on different inventions and algorithms with the Indian patent office. The Smart Wearing Cap Device is one of them. The second one is about Assigning Shortcut Keys, and the third one is Folding Calculator. Also, he got featured in many newspaper and news channels like; Gujarat Samachar, Sandesh News, Vichar Kranti News, DNN Link News Channel, VTV News Channel.");
    
     document.getElementById("video-t").controls = true;
}
function start() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotMedia)
    .catch(e => { console.error('getUserMedia() failed: ', e); });
    document.getElementById("video-tag").controls = true;
 
}

function gotMedia(mediastream) {
  videoTag.srcObject = mediastream;
  document.getElementById('start').disabled = true;
  
  var videoTrack = mediastream.getVideoTracks()[0];
  imageCapturer = new ImageCapture(videoTrack);

  // Timeout needed in Chrome, see https://crbug.com/711524
  setTimeout(() => {
    const capabilities = videoTrack.getCapabilities()
    // Check whether zoom is supported or not.
    if (!capabilities.zoom) {
      return;
    }
    
    zoomSlider.min = capabilities.zoom.min;
    zoomSlider.max = capabilities.zoom.max;
    zoomSlider.step = capabilities.zoom.step;

    zoomSlider.value = zoomSliderValue.value = videoTrack.getSettings().zoom;
    zoomSliderValue.value = zoomSlider.value;
    
    zoomSlider.oninput = function() {
      zoomSliderValue.value = zoomSlider.value;
      videoTrack.applyConstraints({advanced : [{zoom: zoomSlider.value}] });
    }
  }, 500);
  
}

function takePhoto() {
  imageCapturer.takePhoto()
    .then((blob) => {
      console.log("Photo taken: " + blob.type + ", " + blob.size + "B")
      imageTag.src = URL.createObjectURL(blob);
    })
    .catch((err) => { 
      console.error("takePhoto() failed: ", e);
    });
}