/*jshint undef: false */

/* 
jQuery Mobile Boilerplate
mobileinit.js
http://jquerymobile.com/demos/1.0.1/docs/api/globalconfig.html

This file is only required if you need to apply overrides to the
page before anything else has run. It MUST be loaded before
the jQuery Mobile javascript file.
*/
$(document).bind('mobileinit', function(/*event*/){
    
    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;

    if (document.location.hash) {
        console.log("mobileinit" + document.location.hash);
        $.mobile.changePage("#" + document.location.hash,defaultPageTransitions);
    }
    
    // apply overrides here
    //$.mobile.loadingMessage = "Loading ...";
        //$.mobile.loadingMessageTheme = "a"
        //$.mobile.loadingMessageTextVisible = false; 
        //$.mobile.pageLoadErrorMessage = "Error Loading Page"
        //$.mobile.pageLoadErrorMessageTheme = "e"
    
    // Navigation
    //$.mobile.page.prototype.options.backBtnText = "Go back";
    //$.mobile.page.prototype.options.addBackBtn      = true;
    //$.mobile.page.prototype.options.backBtnTheme    = "d";
    
    // Page
    //$.mobile.page.prototype.options.headerTheme = "a";  // Page header only
    //$.mobile.page.prototype.options.contentTheme    = "c";
    //$.mobile.page.prototype.options.footerTheme = "a";
    
    // Listviews
    //$.mobile.listview.prototype.options.headerTheme = "a";  // Header for nested lists
    //$.mobile.listview.prototype.options.theme           = "c";  // List items / content
    //$.mobile.listview.prototype.options.dividerTheme    = "d";  // List divider
    //$.mobile.listview.prototype.options.splitTheme   = "c";
    //$.mobile.listview.prototype.options.countTheme   = "c";
    //$.mobile.listview.prototype.options.filterTheme = "c";
    //$.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
    
    //$.mobile.dialog.prototype.options.theme
    //$.mobile.selectmenu.prototype.options.menuPageTheme
    //$.mobile.selectmenu.prototype.options.overlayTheme
});
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var bgMusic = {
    upbeat: new buzz.sound("sounds/upbeat.mp3")
};
var isBgMusicOn = false;
var soundEffect = {};

var defaultPageTransitions = {
    transition: "fade",
    changeHash: false 
};

$(document)
.on("click", "[href~=#]", function (event) {
    //store this selection in the 
    console.log("Selected Option " +"#"+$.mobile.activePage.attr('id'));
    document.location.hash = "#"+$.mobile.activePage.attr('id');
    
    
    $.mobile.changePage($(this).attr("href"), defaultPageTransitions);
    
    return false;
})
.on("hashchange", function (event) {
    console.log("hashchange");
})
.on("pageinit", function (event) {
    // custom code goes here
})
.on("pageshow", function (event) {
    console.log("Page was shown",event.target);
})
.on("pageshow", "[data-animation]", function (event) {
    var el = $(this);
    var animationName = el.attr('data-animation');
    switch (animationName) 
    {
        case "clouds" :
            var lefts = [-25,-10,0,10,20,30,40,50,60,70,80,90,100,110,120];
            shuffle(lefts);
            
            if (!el.hasClass('clouds-added')) {
                var cloudelement = '<div class="clouds-in-sky" ></div>';
                var cloudelements = '';
                for (var i = 0; i < lefts.length; i++) {
                    cloudelements += cloudelement;
                }
                
                el.append(cloudelements).addClass('clouds-added');
                //el.append('<img class="bedroom" src="images/bedroom.png" />');
            }
            
            var text = $('#title-message');
            var tween = new TimelineMax();
            tween.to(text, 4,{top : '50%', ease: Power1.easeOut });
            tween.to(text, 1,{top : '48%'});
            
            var clouds = $('.clouds-in-sky',el).each(function(i) {
                $(this).css({ left : lefts[i] + '%' });
            });
            
            tween.staggerTo(clouds,2,{top  :  -256 },0.05);
            tween.to(text, 2 ,{ top : -256, ease: Power2.easeIn},'-=2.5');
            console.log(tween);
            //tween.to($('.bedroom',el),1,{zoom:1,opacity:1, ease: Power2.easeOut});
            break;
        default:
            console.log('test');
            
            break;
        
    }
})
.on("pageshow", "[data-bg]", function (event) {
        
    var el = $(this);
    if (isBgMusicOn) {
        $.each(bgMusic, function (i, val) {
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
.on("pageshow", "[data-timeout]", function (event) {
    console.log(event);
    var el = $(this);
    var nextPages = el.nextAll().filter('[data-role="page"]:not([data-ignore])');
    if (nextPages.length) {
        var nextPage = nextPages[0];
        var nextId = "#" + nextPage.id;
        var timeout = parseInt(el.attr('data-timeout'),10);
        console.log(nextId);
        setTimeout(function () {
            $.mobile.changePage(nextId, defaultPageTransitions);
        },timeout);
    }
});