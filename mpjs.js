$(".box").bind('mousedown', function(e) {

    $(this).addClass("active");
    $(this).addClass("click");
    var k = $(this).prop('id');

    var myAudio = document.getElementById(k+ "Audio");
    if (isPlaying) {
        myAudio.pause()
    } else {
        myAudio.play();
    }
    myAudio.onplaying = function() {
        isPlaying = true;
    };
    myAudio.onpause = function() {
        isPlaying = false;
    };
    //document.getElementById(k+'Audio').play();
    //document.getElementById(k+'Audio').currentTime = 0;
    //document.getElementById(k+'Audio').volume = 0.1;
});