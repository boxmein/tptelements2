$(document).ready(function() {
  'use strict';

  // Hash hover witchcraft
  $(".content > [id]").hover(function(evt) {
    var scr = $(document.body).scrollTop();
    document.location.hash = '#' + evt.target.id;
    $(document.body).scrollTop(scr);
  });

  // Bright mode
  $("#bright").click(function(){
    $(document.body).toggleClass('bright');
  });

  // scroll witchcraft
  var $tree = $('#tree');
  var $aside = $('#aside');
  var start = $tree.offset().top;
  var stop = $tree.offset().top + $tree.height() - $aside.height();

  // we start off with the aside-bar stuck to the start
  $aside.addClass('stuck').css({top: start+'px'});
  $aside.stuck = true;

  function attachAside() {
    $aside.stuck = false;
    $aside.removeClass('stuck').css({top: '50px'});
  }

  function detachAside(top) {
    $aside.stuck = true;
    $aside.addClass('stuck').css({'top': top});
  }


  window.onscroll = function() {
    var st = $(document.body).scrollTop();
    console.log(st, start, stop, st>start-50, st>stop-50);

    // if we've scrolled to the tree
    if (st > start - 50 && $aside.stuck) 
      attachAside();

    // if we've scrolled back up past the tree's start
    else if (st <= start - 50 && !$aside.stuck)
      detachAside(start);

    // if we've scrolled past the tree
    if (st >= stop - 50 && !$aside.hasClass('stuck'))
      detachAside(stop);
  };

});