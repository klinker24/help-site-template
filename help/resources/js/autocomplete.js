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

    var autoCompleteResult = matchData(val, keywords);
   
    $("#search").autocomplete({
      source: autoCompleteResult,
      select: function(e, ui) {
        search(ui.item.value);
      }
    })
  }; 

  input.keydown(function() {
    changeInput(input, keywords);
  });

}
