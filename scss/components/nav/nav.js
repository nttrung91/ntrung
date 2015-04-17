$(document).on('click','.js-nav-toggle', function(e) {
  $(this).toggleClass('is-active');
  $('.js-nav-panel').toggleClass('is-hidden');
  e.preventDefault();
});