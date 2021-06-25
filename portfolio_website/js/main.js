/* navbar disappearing while scrolling */
var scroll1 = window.pageYOffset;
window.onscroll = function() {
  var scroll2 = window.pageYOffset;
  if (scroll1 > scroll2) {
    document.querySelector('nav').style.top = "0";
  } else {
    document.querySelector('nav').style.top = "-100px";
  }
  scroll1 = scroll2;
}

/* ScrollMagic plugin */
// init controller
var controller = new ScrollMagic.Controller();

// loop through all elements
$('.fade-in').each(function() {
  
  // build a tween
  var tween = TweenMax.from($(this), 0.3, {autoAlpha: 0, scale: 0.3, y: '0', ease:Linear.easeNone});

  // build a scene
  var scene = new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: "onEnter"
  })
  .setTween(tween) // trigger a TweenMax.to tween
  .addTo(controller);
});