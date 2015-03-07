$(document).ready(function(){

  // Background
  winHeight = $(window).height();
  $('#background').css({height: winHeight});
	
  // Menu
  $('#menu').click(function(){
    $(this).toggleClass('open');
    $('#nav-wrap').toggleClass('open');
    $('header').toggleClass('on');
  });

  // Typer
  $('[data-typer-targets]').typer();
  $('#cta').delay(6000).fadeIn();

  // Smooth Scroll
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

});

$(window).ready(function(){
  $('.home #logo').delay(500).fadeIn('500');
});

$(window).resize(function(){

  winHeight = $(window).height();
  $('#background').css({height: winHeight});

});