
var keyAllowed = {};
var isPlaying = false;

$(document).on('keydown', function(e) {
    if (keyAllowed[e.which] === false) return;
    keyAllowed[e.which] = false;
    if (e.which >= 64 && e.which <= 71) {
        var k = String.fromCharCode(e.which).toLowerCase();
        $("#" + k).addClass("active");
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
        //document.getElementById(k+'Audio').currentTime = -1;
        //document.getElementById(k+'Audio').volume = -1.1;
    }
}).keyup(function(e) {
    if (e.which >= 64 && e.which <= 71) {
        keyAllowed[e.which] = true;
        var k = String.fromCharCode(e.which).toLowerCase();
        $("#" + k).removeClass("active");
    }
});

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
$(".box").bind('mouseleave mouseup', function() {
    if ($(this).hasClass("click")) {
        $(this).removeClass("active");
        $(this).removeClass("click");
    }
});

/*$(".box").ondblclick(function() {
    var k = $(this).prop('id');
    if ($(this).hasClass("click")) {
        $(this).removeClass("active");
        $(this).removeClass("click");
        document.getElementById(k+'Audio').currentTime = 0;
    }
});*/

/*
function playAudio(){
    var audio1 = document.getElementById('audio1');
    var audio2 = document.getElementById('audio2');
    audio1.play();
    audio2.play();
}*/
/*
function mergeAudio(){
    var audio = new Audio(),
        i = 0;
    var playlist = new Array('./musicp/Aminor/Am_piano/Am_piano_1.wav', './musicp/Aminor/Am_piano/Am_piano_1.wav');

    audio.addEventListener('ended', function () {
        i = ++i < playlist.length ? i : 0;
        console.log(i)
        audio.src = playlist[i];
        audio.play();
    }, true);
//audio.volume = 0.3;
    audio.loop = false;
    audio.src = playlist[0];
    audio.play();
}*/

function mergemixAudio() {
    var audiopiano = new Audio(),
        i = 0;
    var audiodrum = new Audio(),
        j = 0;

    var playlistpiano = new Array($(".box").attr({id="a"}), './musicp/Aminor/Am_piano/Am_piano_4.wav', './musicp/Aminor/Am_piano/Am_piano_3.wav', './musicp/Aminor/Am_piano/Am_piano_5.wav');
    var playlistdrum = new Array("./musicp/Drum/drum_1.wav", "./musicp/Drum/drum_2.wav", "./musicp/Drum/drum_2.wav", "./musicp/Drum/drum_1.wav");

    audiopiano.addEventListener('ended', function () {
        i = ++i < playlistpiano.length ? i : 0;
        console.log(i)
        audiopiano.src = playlistpiano[i];
        audiopiano.play();
    }, true);

    audiodrum.addEventListener('ended', function () {
        j = ++j < playlistdrum.length ? j : 0;
        console.log(j)
        audiodrum.src = playlistdrum[j];
        audiodrum.play();
    }, true);
//audio.volume = 0.3;
    audiopiano.loop = false;
    audiodrum.loop = false;
    audiopiano.src = playlistpiano[0];
    audiodrum.src = playlistdrum[0];
    audiopiano.play();
    audiodrum.play();
}


function audioconcat(){
    var audioconcat = require("audioconcat");

    var songs = [
        './musicp/Aminor/Am_piano/Am_piano_1.wav',
        './musicp/Aminor/Am_piano/Am_piano_4.wav',
        './musicp/Aminor/Am_piano/Am_piano_2.wav'
    ]

    audioconcat(songs)
        .concat('all.wav')
        .on('start', function (command) {
            console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Audio created in:', output)
        })
}




function webaudio(){
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new window.AudioContext;
    var oscillator1 = context.createOscillator();
    oscillator1.type = "square";
    oscillator1.frequency.value = 440;
    oscillator1.detune.value = -400;
    oscillator1.connect(context.destination);
    oscillator1.start();
    oscillator1.stop(2);
    oscillator1.onended = function(){alert('stop');};
}




function muse(){
    var buzz = $buzz('./musicp/Aminor/Am_piano/Am_piano_1.wav');

    buzz.play();
}





const box = document.querySelector('.box');
const empties = document.querySelectorAll('.empty');

// Fill listeners
box.addEventListener('dragstart', dragStart);
box.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart(ev) {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
    //ev.currentTarget.style.border = "dashed";
    // Add the id of the drag source element to the drag data payload so
    // it is available when the drop event is fired
    ev.dataTransfer.setData("text", ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "copyMove";

}

function dragEnd() {
    this.className = 'box';
}

function dragOver(ev) {
    ev.preventDefault();
}

function dragEnter(ev) {
    ev.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'empty';
}

function dragDrop() {
    this.className = 'empty';
    this.append(box);
}

/*
var myAudio = document.getElementById("bAudio");
var isPlaying = false;

function togglePlayb() {
    if (isPlaying) {
        myAudio.pause()
    } else {
        myAudio.play();
    }
};
myAudio.onplaying = function() {
    isPlaying = true;
    console.log(isPlaying)
};
myAudio.onpause = function() {
    isPlaying = false;
    console.log(isPlaying)
};*/