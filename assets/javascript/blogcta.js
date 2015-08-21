/*
 * Copyright (C) 2015 Hindsight Software Ltd
 */

function shouldDisplay() {
  var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
  return (docViewTop >= 75)
}

console.log('run1')
if ($('.share-widget-container-fixed')) {
  console.log('run2')

  var displayed = false;

  $(window).scroll(function () {
    console.log('scroll')
    console.log(shouldDisplay())
    if (shouldDisplay()) {
      //slide CTA onto screen
      if (!displayed) {
        $('.share-widget-container-fixed').animate({
          bottom: 0
        }, "fast");
        $('.product-blog-cta-container').animate({
          top: 0
        }, "fast");

        displayed = true;
      }
    } else if (displayed) {
      $('.share-widget-container-fixed').animate({
        bottom: -200
      }, "fast");
      $('.product-blog-cta-container').animate({
        top: -200
      }, "fast");
      displayed = false;
    }

  });
}