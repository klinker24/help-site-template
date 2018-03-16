var MAIN_CONTENT_SIZE = 950;
var MINI_VERSION_SIZE = 750;
var SIDE_MENU_WIDTH = 269;

var isMiniVersion = false;

$(window).on('resize', function() {
  resizeMargins();
});

$(document).ready(function() {
  resizeMargins();
});

function resizeMargins() {
  var margin = 0;
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  if (windowWidth > MAIN_CONTENT_SIZE) {
    margin = (windowWidth - MAIN_CONTENT_SIZE) / 2;
  }

  $("#toolbar_inner").css("margin-left", margin + "px");
  $("#all_holder").css("margin-left", margin + "px");
  $("#side-menu").css("height", windowHeight + "px");
  $("#message-list-wrapper").css("min-height", windowHeight + "px");
}
