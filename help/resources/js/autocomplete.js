var autocompleteColor = "#B2DFDB";

function autocomplete(input, keywords) {
  var matchData = function(input, keywords) {
    var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
    return keywords.filter(function(word) {
      if (word.match(reg)) {
        return word;
      }
    });
  };

  var changeInput = function(input, keywords) {
    var val = input.val();
    var inputAncestor = input.parent();
    var res = inputAncestor.find('.autocomplete-result');

    while (res.length == 0) {
      inputAncestor = inputAncestor.parent();
      res = inputAncestor.find('.autocomplete-result');
    }

    res.empty().hide();
    var autoCompleteResult = matchData(val, keywords);
    if (val == "" || autoCompleteResult.length == 0) {
      return;
    }

    for (var i = 0; i < autoCompleteResult.length; i++) {
      var item = autoCompleteResult[i].toLowerCase();
      var p = $('<p />');

      p.text(item);
      p.data('word', item);

      p.css({
        'margin': '0px',
        'text-align': 'left',
        'padding-left': parseInt(input.css('padding-left'), 10) + parseInt(input.css('border-left-width'), 10)
      });

      p.click(function() {
        var clickedWord = $(this).data('word');
        input.val(clickedWord + "\n");
        search(clickedWord);

        res.empty().hide();
      });

      p.mouseenter(function() {
        $(this).css("background-color", autocompleteColor);
        $(this).css("color", "white");
      }).mouseleave(function() {
        $(this).css("background-color", "white");
        $(this).css("color", "black");
      });

      res.append(p);
    }

    res.css({
      'left': input.position().left + 10,
      'width': input.width() + parseFloat(input.css('padding-left'), 10) + parseInt(input.css('border-left-width'), 10) + 1,
      'position': 'absolute',
      'background-color': "white",
      'border': '1px solid #dddddd',
      'max-height': '300px',
      'overflow': 'scroll',
      'overflow-x': 'hidden',
      'font-family': input.css('font-family'),
      'font-size': input.css('font-size'),
      'z-index': '10'
    }).insertAfter(input).show();
  };

  var res = $("<div class='autocomplete-result' />");
  res.insertAfter(input);
  input.keyup(function() {
    changeInput(input, keywords);
  });

  $(document).click(function(event) {
    if (!$(event.target).closest('.autocomplete-result').length) {
      res.empty().hide();
    }
  });
}
