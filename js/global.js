var trung = trung || {};

trung.plugIns = {

  init: function() {
    trung.plugIns.fastClick();
    trung.plugIns.styleCurrentPage();
  },

  fastClick: function() {
    FastClick.attach(document.body);
  },

  // Add 'is-active' class to selected page on Menu
  styleCurrentPage: function() {
    $('a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('is-active');
  }
};





// INITS
trung.plugIns.init();




// SmoothState can't be added to trung.plugIns
;(function($) {
  'use strict';
  var $body = $('html, body'),
      content = $('#main').smoothState({
        prefetch: true,
        // Runs when a link has been activated
        onStart: {
          duration: 250,
          render: function (url, $container) {
            _gaq.push(['_trackPageview', url]);
            content.toggleAnimationClass('is-exiting');
            $body.animate({
              scrollTop: 0
            });
          }
        }
      }).data('smoothState');
      //.data('smoothState') makes public methods available
})(jQuery);