var lastClick = currentTime();

function makeExpandable() {
  $('.mdl-collapse__content').each(function() {
    var content = $(this);
    content.css('margin-top', -content.height());
  })

  $(document.body).on('click', '.mdl-collapse__button', function() {
    if (currentTime() - lastClick < 500) {
      return;
    } else {
      lastClick = currentTime();
    }

    var $element = $(this).parent('.mdl-collapse');

    if ($element.hasClass("mdl-collapse--opened")) {
      $element.removeClass("mdl-collapse--opened");
    } else {
      $element.addClass("mdl-collapse--opened");
    }
  });
}

function currentTime() {
  return new Date().getTime();
}
