var tile;

tile = tile || {};

// elements and cached DOM elements
tile.elements = {
    $containerTiles: $('.wrapper--tiles'),
    $containerSelTiles: $('.wrapper--assigned-tiles'),
    $containerunassignedTiles: $('.wrapper--unassigned-tiles'),
    dragSrcElement: null
};

tile.classes = {
    assigned : 'assigned-tile',
    unassigned : 'unassigned-tile',
    dragging : 'dragging',
    draggingOver: 'over'
};

tile.helpers = {

    handleDragStart: function(e) {
        var $draggedElement = $(this),
            dataTransfer = e.originalEvent.dataTransfer;
        console.log("handleDragStart");

        // element being dragged is an unassigned tile or an assigned tile, allow transfer
        if ($draggedElement.hasClass(tile.classes.assigned) || $draggedElement.hasClass(tile.classes.unassigned)) {
            tile.elements.dragSrcElement = $draggedElement;
            $draggedElement.addClass(tile.classes.dragging);
            dataTransfer.setData('text', $draggedElement.attr('data-index'));
        } else {
            return false;
        }
    },

    handleDragEnter: function() {
        var $dropZoneElement = $(this);
        console.log("handleDragEnter");

        $dropZoneElement.addClass(tile.classes.draggingOver);
        return false;
    },

    handleDragOver: function(e) {
        var $dropZoneElement,
            dataTransfer = e.originalEvent.dataTransfer;
        console.log("handleDragOver");

        if (e.preventDefault) {
            e.preventDefault();
        }

        if (e.currentTarget) {
            $dropZoneElement = $(e.currentTarget);

            if ($dropZoneElement.hasClass(tile.classes.unassigned)) {
                dataTransfer.dropEffect = 'none';
                $dropZoneElement.removeClass(tile.classes.draggingOver);
            } else {
                dataTransfer.dropEffect = 'move';
            }
        }

        return false;
    },

    handleDragLeave: function() {
        $(this).removeClass(tile.classes.draggingOver);
        console.log("handleDragLeave");
    },

    handleDrop: function(e) {
        var $droppedOnElement = $(this),
            index,
            $temp;
        console.log("handleDrop");

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (tile.elements.dragSrcElement && tile.elements.dragSrcElement !== $droppedOnElement) {
            index = e.originalEvent.dataTransfer.getData('text');
            console.log("dataindex"+index);
            $temp = $('.tile[data-index="' + index + '"]').clone(true, true);

            if (!tile.elements.dragSrcElement.hasClass(tile.classes.unassigned)) {
                tile.elements.dragSrcElement[0].outerHTML = $droppedOnElement[0].outerHTML;
                //console.log($droppedOnElement[0].outerHTML);
            }

            /*if (!$droppedOnElement.hasClass(tile.classes.assigned)) {
                tile.elements.dragSrcElement.remove();
            }*/

            tile.elements.dragSrcElement[0].innerHTML = $droppedOnElement[0].innerHTML;
            console.log($droppedOnElement[0]);


            if ($temp.hasClass(tile.classes.unassigned)) {
                $temp.removeClass(tile.classes.unassigned).addClass(tile.classes.assigned);
                $temp.attr('data-index', $droppedOnElement.attr('data-index'));
            }

            $temp.insertAfter($droppedOnElement);
            $droppedOnElement.remove();

            $('.' + tile.classes.draggingOver).removeClass(tile.classes.draggingOver);
            $('.' + tile.classes.dragging).removeClass(tile.classes.dragging);
        }

        if (tile.elements.dragSrcElement === null) {
            tile.helpers.handleDragLeave($droppedOnElement);
        }

        return false;
    },

    handleDragEnd: function(elements, classesToRemove) {
        elements.removeClass(classesToRemove);
        console.log("handleDragEnd");

    }

};

$(function() {
    // Attaches drag events
    tile.elements.$containerTiles.on( 'dragstart', '.tile', tile.helpers.handleDragStart )
        .on( 'dragenter', '.tile', tile.helpers.handleDragEnter )
        .on( 'dragover' , '.tile', tile.helpers.handleDragOver  )
        .on( 'dragleave', '.tile', tile.helpers.handleDragLeave )
        .on( 'drop'     , '.tile', tile.helpers.handleDrop      )
        .on( 'dragend'  , '.tile', function(e) {
            var tiles = tile.elements.$containerTiles.find('.tile'),
                classesToRemove = tile.classes.dragging + ' ' + tile.classes.draggingOver;

            tile.helpers.handleDragEnd(tiles, classesToRemove);
        });
});




//按兩下播放方塊
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



$(".unassigned-tile").bind('mousedown', function(e) {

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
    document.getElementById(k+'Audio').currentTime = 0;
    //document.getElementById(k+'Audio').volume = 0.1;
});
$(".unassigned-tile").bind('mouseleave mouseup', function() {
    if ($(this).hasClass("click")) {
        $(this).removeClass("active");
        $(this).removeClass("click");
    }
});







/*function mergeAudio(){
    var audio = new Audio(),
        i = 0;
    var o =  $("ul:eq(0) li:eq(0)").attr("id");
    console.log(o);

    var p =  $("ul:eq(0) li:eq(1)").attr("id");
    console.log(p);

    //var myAudio = document.getElementById(o+ "Audio");
    var playlist = new Array('./musicp/Aminor/Am_piano/'+o+'.wav','./musicp/Aminor/Am_piano/'+p+'.wav');
    let PlaylistString = playlist.toString();
    console.log(PlaylistString);
    if (PlaylistString.includes('./musicp/Aminor/Am_piano/e.wav')){
        confirm('no');
    }
    //./musicp/Aminor/Am_piano/e.wav,./musicp/Aminor/Am_piano/c.wav


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

//條件merge
function mergeAudio(){
    var audio = new Audio(),
        i = 0;
    var o =  $("ul:eq(0) li:eq(0)").attr("id");
    console.log(o);

    var p =  $("ul:eq(0) li:eq(1)").attr("id");
    console.log(p);

    var q =  $("ul:eq(0) li:eq(2)").attr("id");
    console.log(q);
    //var myAudio = document.getElementById(o+ "Audio");
    var playlist = new Array('./musicp/Aminor/Am_piano/'+o+'.wav','./musicp/Aminor/Am_piano/'+p+'.wav','./musicp/Aminor/Am_piano/'+q+'.wav');
    let PlaylistString = playlist.toString();
    console.log(PlaylistString); //轉字串
    if (PlaylistString.includes('./musicp/Aminor/Am_piano/e.wav,./musicp/Aminor/Am_piano/a.wav')){
        var yn= confirm('no');
        if (yn==true){
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
        }else{
            return;
        }

    }else{

        audio.addEventListener('ended', function () {
            $("ul:eq(0) li:eq("+i+")").removeClass("active");
            i = ++i < playlist.length ? i : 0;
            console.log(i);
            $("ul:eq(0) li:eq("+i+")").addClass('active');
            audio.src = playlist[i];
            console.log('avti');
            audio.play();


        }, true);



//audio.volume = 0.3;
        //$("ul:eq(0) li:eq(0)").addClass('active');

        audio.loop = false;
        audio.src = playlist[0];
        console.log('why');
        $("ul:eq(0) li:eq(0)").addClass('active');

        audio.play();


    }


}
//./musicp/Aminor/Am_piano/e.wav,./musicp/Aminor/Am_piano/c.wav




/*function mergeAudio(){
    var audio = new Audio(),
        i = 0;
    var playlist = new Array( './musicp/Aminor/Am_piano/a.wav' , './musicp/Aminor/Am_piano/b.wav');
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

function playid(){
    var k =  $("ul:eq(1) li:eq(4)").attr("id");
    console.log(k);

    var myAudio = document.getElementById(k+ "Audio");
    myAudio.play();
}

//按按鍵 可播放id 方塊會有顏色 框框也是
function playid01(){
    var o =  $("ul:eq(0) li:eq(0)").attr("id");
    $("ul:eq(0) li:eq(0)").addClass('active');

    console.log(o);

    var myAudio = document.getElementById(o+ "Audio");
    myAudio.play();

    myAudio.onended = function() {
        isPlaying = false;
        console.log('false');
        $("ul:eq(0) li:eq(0)").removeClass("active");
        console.log('ro');
    };
}

//按按鍵 可播放id 方塊會有顏色 框框也是
function playid07(){
    var x =  $("ul:eq(0) li:eq(7)").attr("id");
    $("ul:eq(0) li:eq(7)").addClass('active');
    console.log(x);

    var myAudio = document.getElementById(x + "Audio");
    myAudio.play();

    myAudio.onended = function() {
        isPlaying = false;
        console.log('false');
        $("ul:eq(0) li:eq(7)").removeClass("active");
        console.log('ro');
    };
}



/*play: function create(data, callback) {
    // create audio node and play buffer
    var me = this,
        source = this.context.createBufferSource(),
        gainNode = this.context.createGain();
    if (!source.start) { source.start = source.noteOn; }
    if (!source.stop) { source.stop = source.noteOff; }
    source.connect(gainNode);
    gainNode.connect(this.context.destination);
    source.buffer = './musicp/Aminor/Am_piano/d.wav','./musicp/Aminor/Am_piano/a.wav';
    source.loop = true;
    source.startTime = this.context.currentTime; // important for later!
    source.start(0);
    return source;
}*/

/*
function con(){
    var songs = [
        './musicp/Aminor/Am_piano/e.wav',
        './musicp/Aminor/Am_piano/c.wav',
        './musicp/Aminor/Am_piano/e.wav'
    ]

    var audioconcat(songs).concat('all.mp3')
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

}*/










