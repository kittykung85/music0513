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






var tile1;

tile1 = tile1 || {};

// elements and cached DOM elements
tile1.elements = {
    $containerTiles: $('.wrapper--tiles1'),
    $containerSelTiles: $('.wrapper--assigned-tiles1'),
    $containerunassignedTiles: $('.wrapper--unassigned-tiles1'),
    dragSrcElement: null
};

tile1.classes = {
    assigned : 'assigned-tile1',
    unassigned : 'unassigned-tile1',
    dragging : 'dragging1',
    draggingOver: 'over1'
};

tile1.helpers = {

    handleDragStart: function(e) {
        var $draggedElement = $(this),
            dataTransfer = e.originalEvent.dataTransfer;
        console.log("handleDragStart1");

        // element being dragged is an unassigned tile or an assigned tile, allow transfer
        if ($draggedElement.hasClass(tile1.classes.assigned) || $draggedElement.hasClass(tile1.classes.unassigned)) {
            tile1.elements.dragSrcElement = $draggedElement;
            $draggedElement.addClass(tile1.classes.dragging);
            dataTransfer.setData('text', $draggedElement.attr('data-index'));
        } else {
            return false;
        }
    },

    handleDragEnter: function() {
        var $dropZoneElement = $(this);
        console.log("handleDragEnter1");

        $dropZoneElement.addClass(tile1.classes.draggingOver);
        return false;
    },

    handleDragOver: function(e) {
        var $dropZoneElement,
            dataTransfer = e.originalEvent.dataTransfer;
        console.log("handleDragOver1");

        if (e.preventDefault) {
            e.preventDefault();
        }

        if (e.currentTarget) {
            $dropZoneElement = $(e.currentTarget);

            if ($dropZoneElement.hasClass(tile1.classes.unassigned)) {
                dataTransfer.dropEffect = 'none';
                $dropZoneElement.removeClass(tile1.classes.draggingOver);
            } else {
                dataTransfer.dropEffect = 'move';
            }
        }

        return false;
    },

    handleDragLeave: function() {
        $(this).removeClass(tile1.classes.draggingOver);
        console.log("handleDragLeave");
    },

    handleDrop: function(e) {
        var $droppedOnElement = $(this),
            indexd,
            $temp;
        console.log("handleDrop1");

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (tile1.elements.dragSrcElement && tile1.elements.dragSrcElement !== $droppedOnElement) {
            indexd = e.originalEvent.dataTransfer.getData('text');
            //console.log("dataindexd"+indexd);
            $temp = $('.tile1[data-index="' + indexd + '"]').clone(true, true);

            if (!tile1.elements.dragSrcElement.hasClass(tile1.classes.unassigned)) {
                tile1.elements.dragSrcElement[0].outerHTML = $droppedOnElement[0].outerHTML;
                //console.log($droppedOnElement[0].outerHTML);
            }

            /*if (!$droppedOnElement.hasClass(tile.classes.assigned)) {
                tile.elements.dragSrcElement.remove();
            }*/

            tile1.elements.dragSrcElement[0].innerHTML = $droppedOnElement[0].innerHTML;
            console.log($droppedOnElement[0]);


            if ($temp.hasClass(tile1.classes.unassigned)) {
                $temp.removeClass(tile1.classes.unassigned).addClass(tile1.classes.assigned);
                $temp.attr('data-index', $droppedOnElement.attr('data-index'));
            }

            $temp.insertAfter($droppedOnElement);
            $droppedOnElement.remove();

            $('.' + tile1.classes.draggingOver).removeClass(tile1.classes.draggingOver);
            $('.' + tile1.classes.dragging).removeClass(tile1.classes.dragging);
        }

        if (tile1.elements.dragSrcElement === null) {
            tile1.helpers.handleDragLeave($droppedOnElement);
        }

        return false;
    },

    handleDragEnd: function(elements, classesToRemove) {
        elements.removeClass(classesToRemove);
        console.log("handleDragEnd1");

    }

};

$(function() {
    // Attaches drag events
    tile1.elements.$containerTiles.on( 'dragstart', '.tile1', tile1.helpers.handleDragStart )
        .on( 'dragenter', '.tile1', tile1.helpers.handleDragEnter )
        .on( 'dragover' , '.tile1', tile1.helpers.handleDragOver  )
        .on( 'dragleave', '.tile1', tile1.helpers.handleDragLeave )
        .on( 'drop'     , '.tile1', tile1.helpers.handleDrop      )
        .on( 'dragend'  , '.tile1', function(e) {
            var tiles1 = tile1.elements.$containerTiles.find('.tile1'),
                classesToRemove = tile1.classes.dragging + ' ' + tile1.classes.draggingOver;

            tile1.helpers.handleDragEnd(tiles1, classesToRemove);
        });
});




//按兩下播放方塊
var keyAllowed = {};
var isPlaying = false;
var pianoplaying = false;
var Pianoaudio = new Audio();
var drumplaying = false;
var Drumaudio = new Audio();
var i = 0;
var j = 0;


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



$(".unassigned-tile1").bind('mousedown', function(e) {

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
$(".unassigned-tile1").bind('mouseleave mouseup', function() {
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
function mergePiano(){
    Pianoaudio = new Audio();
    //var Pianoaudio = new Audio(),
    //var i = 0;
    var o =  $("ul:eq(0) li:eq(0)").attr("id");
    console.log(o);

    var p =  $("ul:eq(0) li:eq(1)").attr("id");
    console.log(p);

    var q =  $("ul:eq(0) li:eq(2)").attr("id");
    console.log(q);
    //var myAudio = document.getElementById(o+ "Audio");
    var playlistP = new Array('./musicp/CMajor/CM_piano/'+o+'.wav','./musicp/CMajor/CM_piano/'+p+'.wav','./musicp/CMajor/CM_piano/'+q+'.wav');
    let PlaylistPString = playlistP.toString();
    console.log(PlaylistPString); //轉字串
    if (PlaylistPString.includes('./musicp/CMajor/CM_piano/e.wav,./musicp/CMajor/CM_piano/a.wav')){
        var yn= confirm('no');
        if (yn==true){
            Pianoaudio.addEventListener('ended', function () {
                i = ++i < playlistP.length ? i : 0;
                console.log(i)
                Pianoaudio.src = playlistP[i];
                Pianoaudio.play();
            }, true);
//audio.volume = 0.3;
            Pianoaudio.loop = false;
            Pianoaudio.src = playlistP[0];
            Pianoaudio.play();
        }else{
            return;
        }

    }else{

        Pianoaudio.addEventListener('ended', function () {
            $("ul:eq(0) li:eq("+i+")").removeClass("active");
            i = ++i < playlistP.length ? i : 0;
            console.log(i);
            $("ul:eq(0) li:eq("+i+")").addClass('active');
            Pianoaudio.src = playlistP[i];
            console.log('avti');
            Pianoaudio.play();
        }, true);

        Pianoaudio.onplaying = function(){
            pianoplaying = true;
        }

        Pianoaudio.loop = false;
        Pianoaudio.src = playlistP[0];
        console.log('why');
        $("ul:eq(0) li:eq(0)").addClass('active');
        Pianoaudio.play();
    }
}
//./musicp/Aminor/Am_piano/e.wav,./musicp/Aminor/Am_piano/c.wav

function mergeDrum(){

    var Drumaudio = new Audio();
    i = 0;

    var Do =  $("ul:eq(2) li:eq(0)").attr("id");
    console.log(Do);

    var Dp =  $("ul:eq(2) li:eq(1)").attr("id");
    console.log(Dp);

    var Dq =  $("ul:eq(2) li:eq(2)").attr("id");
    console.log(Dq);
    var playlistD = new Array( './musicp/Drum/'+Do+'.wav','./musicp/Drum/'+Dp+'.wav','./musicp/Drum/'+Dq+'.wav');

    Drumaudio.addEventListener('ended', function () {
        $("ul:eq(2) li:eq("+i+")").removeClass("active");
        i = ++i < playlistD.length ? i : 0;
        console.log(i);
        $('#clonedrum').html($('#clonethisdrum').children().clone());
        $("ul:eq(2) li:eq("+i+")").addClass('active');
        $('#clonedrum').html($('#clonethisdrum').children().clone());
        Drumaudio.src = playlistD[i];
        console.log('avti');
        Drumaudio.play();
    }, true);

    Drumaudio.onplaying = function(){
        drumplaying = true;
    }
    Drumaudio.onpause = function(){
        drumplaying = false;
    }

    Drumaudio.loop = false;
    Drumaudio.src = playlistD[0];
    console.log('why');
    $('#clonedrum').html($('#clonethisdrum').children().clone());
    $("ul:eq(2) li:eq(0)").addClass('active');
    Drumaudio.play();

}

function mergeDrum1(){

    Drumaudio = new Audio();

    var Do =  $("ul:eq(2) li:eq(0)").attr("id");
    console.log(Do);

    var Dp =  $("ul:eq(2) li:eq(1)").attr("id");
    console.log(Dp);

    var Dq =  $("ul:eq(2) li:eq(2)").attr("id");
    console.log(Dq);

    var Dr =  $("ul:eq(2) li:eq(3)").attr("id");
    console.log(Dr);
    var playlistD = new Array( './musicp/Drum/'+Do+'.wav','./musicp/Drum/'+Dp+'.wav','./musicp/Drum/'+Dq+'.wav','./musicp/Drum/'+Dr+'.wav');

    Drumaudio.addEventListener('ended', function () {
        $("ul:eq(2) li:eq("+j+")").removeClass("active");
        j = ++j < playlistD.length ? j : 0;
        console.log(j);
        $('#clonedrum').html($('#clonethisdrum').children().clone());
        $("ul:eq(2) li:eq("+j+")").addClass('active');
        $('#clonedrum').html($('#clonethisdrum').children().clone());
        Drumaudio.src = playlistD[j];
        console.log('avti');
        Drumaudio.play();
    }, true);

    Drumaudio.onplaying = function(){
        drumplaying = true;
    }
    Drumaudio.onpause = function(){
        drumplaying = false;
    }

    Drumaudio.loop = false;
    Drumaudio.src = playlistD[j];
    console.log('why');
    $('#clonedrum').html($('#clonethisdrum').children().clone());
    $("ul:eq(2) li:eq("+j+")").addClass('active');
    Drumaudio.play();

}


function mergeAudio(){
    mergePiano1()
    mergeDrum1()
}

function stopPianoaudio(){
    console.log(pianoplaying);
    if (pianoplaying) {
        Pianoaudio.pause();
        pianoplaying = false;
        console.log(pianoplaying);
        $("ul:eq(0) li:eq("+i+")").removeClass("active");
        $('#clonepiano').html($('#clonethispiano').children().clone());
        i = 0;
        console.log(i);
        playpausebtn.innerHTML=("Play Piano");

    }else {
        i = 0;
        console.log("i must be 0 when i stop"+i);
        playpausebtn.innerHTML=("Play Piano");
    }
}

function stopDrumaudio(){
    console.log(drumplaying);
    if (drumplaying) {
        Drumaudio.pause();
        drumplaying = false;
        console.log(drumplaying);
        $("ul:eq(2) li:eq("+j+")").removeClass("active");
        $('#clonedrum').html($('#clonethisdrum').children().clone());
        j = 0;
        console.log(j);
        drumplaypausebtn.innerHTML=("Play Drum");

    }else {
        j = 0;
        console.log("drum must be 0 when ijj stop"+j);
        drumplaypausebtn.innerHTML=("Play Drum");
    }
}

//i是暫停的部分
function mergePiano1(){
    Pianoaudio = new Audio();
    //var Pianoaudio = new Audio(),
    //var i = 0;
    var o =  $("ul:eq(0) li:eq(0)").attr("id");
    console.log(o);

    var p =  $("ul:eq(0) li:eq(1)").attr("id");
    console.log(p);

    var q =  $("ul:eq(0) li:eq(2)").attr("id");
    console.log(q);

    var r =  $("ul:eq(0) li:eq(3)").attr("id");
    console.log(r);
    //var myAudio = document.getElementById(o+ "Audio");
    var playlistP = new Array('./musicp/CMajor/CM_piano/'+o+'.wav','./musicp/CMajor/CM_piano/'+p+'.wav','./musicp/CMajor/CM_piano/'+q+'.wav','./musicp/CMajor/CM_piano/'+r+'.wav');
    let PlaylistPString = playlistP.toString();
    console.log(PlaylistPString); //轉字串
    if (PlaylistPString.includes('./musicp/CMajor/CM_piano/e.wav,./musicp/CMajor/CM_piano/a.wav')){
        var yn= confirm('第五個模組接第一個模組不合適，確定繼續嗎？');
        if (yn==true){
            Pianoaudio.addEventListener('ended', function () {
                $("ul:eq(0) li:eq("+i+")").removeClass("active");
                i = ++i < playlistP.length ? i : 0;
                console.log(i);
                $('#clonepiano').html($('#clonethispiano').children().clone());
                $("ul:eq(0) li:eq("+i+")").addClass('active');
                $('#clonepiano').html($('#clonethispiano').children().clone());
                Pianoaudio.src = playlistP[i];
                console.log('avti');
                Pianoaudio.play();
            }, true);

            Pianoaudio.onplaying = function(){
                pianoplaying = true;
            }
            Pianoaudio.onpause = function(){
                pianoplaying = false;
            }

            Pianoaudio.loop = false;
            Pianoaudio.src = playlistP[i];
            console.log('why');
            $("ul:eq(0) li:eq("+i+")").addClass('active');
            Pianoaudio.play();
        }else{
            playpausebtn.innerHTML=("Play Piano");
            return;
        }

    }else{

        Pianoaudio.addEventListener('ended', function () {
            $("ul:eq(0) li:eq("+i+")").removeClass("active");
            i = ++i < playlistP.length ? i : 0;
            console.log(i);
            $('#clonepiano').html($('#clonethispiano').children().clone());
            $("ul:eq(0) li:eq("+i+")").addClass('active');
            $('#clonepiano').html($('#clonethispiano').children().clone());
            Pianoaudio.src = playlistP[i];
            console.log('avti');
            Pianoaudio.play();
        }, true);

        Pianoaudio.onplaying = function(){
            pianoplaying = true;
        }
        Pianoaudio.onpause = function(){
            pianoplaying = false;
        }

        Pianoaudio.loop = false;
        Pianoaudio.src = playlistP[i];
        console.log('why');
        $('#clonepiano').html($('#clonethispiano').children().clone());
        $("ul:eq(0) li:eq("+i+")").addClass('active');
        Pianoaudio.play();
    }
}

//暫停 從暫停地方繼續
function pausePianoaudio(){
    if (pianoplaying) {
        Pianoaudio.pause();
        pianoplaying = false;
        console.log(pianoplaying);
        $("ul:eq(0) li:eq("+i+")").removeClass("active");
        console.log(i);

    }else {
        return;
    }
}


function Pianoplaypause(){
    if(pianoplaying){
        //console.log("does it pause??"+pianoplaying);
        playpausebtn.innerHTML=("Play Piano")
        pausePianoaudio();
        //console.log("pause false"+pianoplaying);
    }
    else{
        //console.log("before"+pianoplaying);
        playpausebtn.innerHTML=("Pause");
        mergePiano1();
        $('#clonepiano').html($('#clonethispiano').children().clone());
        //console.log("must true play??"+pianoplaying);
    }
}


//暫停 從暫停地方繼續
function pausePianoaudio(){
    if (pianoplaying) {
        Pianoaudio.pause();
        pianoplaying = false;
        console.log(pianoplaying);
        $("ul:eq(0) li:eq("+i+")").removeClass("active");
        console.log(i);

    }else {
        return;
    }
}

//drum撥放跟暫停同一顆  mergedrum的i有紀錄
function Drumplaypause(){
    if(drumplaying){
        //console.log("does it pause??"+pianoplaying);
        drumplaypausebtn.innerHTML=("Play Drum")
        pauseDrumaudio();
        //console.log("pause false"+pianoplaying);
    }
    else{
        //console.log("before"+pianoplaying);
        drumplaypausebtn.innerHTML=("Pause");
        mergeDrum1();
        $('#clonedrum').html($('#clonethisdrum').children().clone());
        //console.log("must true play??"+pianoplaying);
    }
}

function pauseDrumaudio(){
    if (drumplaying) {
        Drumaudio.pause();
        drumplaying = false;
        console.log(drumplaying);
        $("ul:eq(2) li:eq("+j+")").removeClass("active");
        console.log(j);

    }else {
        return;
    }
}



function playpauseaudio1(){
    if(i!=j){
        i = 0;
        j = 0;

        if(pianoplaying && drumplaying){
            audioplaypausebtn.innerHTML=("play ALL !");
            Pianoplaypause();
            Drumplaypause();
        }else{
            audioplaypausebtn.innerHTML=("Pause ALL !");
            Pianoplaypause();
            Drumplaypause();
        }

    }else{
        if(pianoplaying && drumplaying){
            audioplaypausebtn.innerHTML=("play ALL !");
            Pianoplaypause();
            Drumplaypause();
        }else{
            audioplaypausebtn.innerHTML=("Pause ALL !");
            Pianoplaypause();
            Drumplaypause();
        }
    }
}



function stopaudio(){
    audioplaypausebtn.innerHTML=("play ALL !");
    stopPianoaudio();
    stopDrumaudio();
}



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


function playid01Drum(){
    var Do =  $("ul:eq(2) li:eq(0)").attr("id");
    $("ul:eq(2) li:eq(0)").addClass('active');

    console.log(Do);

    var myAudio = document.getElementById(Do+ "Audio");
    myAudio.play();

    myAudio.onended = function() {
        isPlaying = false;
        console.log('false');
        $("ul:eq(2) li:eq(0)").removeClass("active");
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

function clone(){
    $('#clonepiano').html($('#clonethispiano').children().clone());
    $('#clonedrum').html($('#clonethisdrum').children().clone());
    console.log("cloneee");
}






function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btn btn-warning-outline display-4");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    $('#clonepiano').html($('#clonethispiano').children().clone());
    $('#clonedrum').html($('#clonethisdrum').children().clone());
    console.log("cloneee1");

}