;(function($) {
  'use strict';

  var trung = trung || {};

  trung.menu = {

    init: function() {
      this.highlightCurrentMenu();
    },

    // Add 'is-active' class to selected page on Menu
    highlightCurrentMenu: function() {
      $('a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('is-active');
    }
  };


  trung.plugIns = {

    init: function() {
      this.fastClick();
      this.smoothState();
    },

    fastClick: function() {
      FastClick.attach(document.body);
    },

    smoothState: function() {
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
    }
  };





  // INITS
  trung.menu.init();
  trung.plugIns.init();
})(jQuery);