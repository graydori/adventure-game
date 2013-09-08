/* 
	jQuery Mobile Boilerplate
	application.js
*/

var bgMusic = {
    upbeat : new buzz.sound( "sounds/upbeat.mp3")
};
var isBgMusicOn = false;
var soundEffect = {
};

$(document).on("pageinit", function(event){
	// custom code goes here
})
.on("pageshow", function (event) {
    $(event.target).addClass('animation-complete');
})
.on("pageshow","[data-bg]", function( event ) {
    var el = $(this);
    if (isBgMusicOn) {
        $.each(bgMusic,function(i,val) {
            val.stop().fadeOut();
        });
    }
    var selectedMusic = bgMusic[el.attr("data-bg")];
    if (selectedMusic) {
        selectedMusic.setVolume(10)
        .play()
        .fadeIn()
        .loop();
        isBgMusicOn = true;
    }
})
.on("pageshow" ,"[data-timeout]",function( event ) {
    var el = $(this);
    var nextPages = el.nextAll().filter('[data-role="page"]:not([data-ignore])');
    if (nextPages.length) {
        var nextPage = nextPages[0];
        var hasTimeout = $(nextPage).attr('data-timeout');
        var nextId = "#" + nextPage.id;
        var options = { transition: "fade" };
        if (hasTimeout) {
            options.changeHash = false;
        }
        console.log(nextId);
        setTimeout(function() {
            $.mobile.changePage( nextId, options );
        },parseInt(el.attr('data-timeout')));
    }
});
