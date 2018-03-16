$(document).ready(function() {
    $("#logo").click(function() {
        window.location.replace("../index.html")
    });

    $("#search").on("keyup", function(event) {
        if (event.keyCode == 13) {
            search($(this).val());
            return true;
        }

        return false;
    });

    displayResults(faq, false);
    autocomplete($("#search"), getKeywords())
});

function getKeywords() {
  var allFaq = JSON.parse(JSON.stringify(faq));
  var keywords = [];
  var word = "";
  var words = [];

  for (var x = 0; x < allFaq.length; x++) {
    for (var i = 0; i < allFaq[x].items.length; i++) {
      words = allFaq[x].items[i].keywords.split(" ");
      for (var j = 0; j < words.length; j++) {
        word = words[j].toLowerCase();
        if (keywords.indexOf(word) == -1) {
          keywords.push(word);
        }
      }
    }
  }

  return keywords.sort()
}

function search(search) {
  var results = [];

  if (search.length == 0) {
    $("#content").html("");
    displayResults(faq, false);

    return;
  } else {
    var keywords = search.split(" ");
    for (var i = 0; i < keywords.length; i++) {
      if (keywords[i].length < 3) {
        keywords.splice(i, 1);
        i--;
      }
    }

    var results = JSON.parse(JSON.stringify(faq));

    for (var x = 0; x < results.length; x++) {
      for (var i = 0; i < results[x].items.length; i++) {
        var found = false;
        for (var j = 0; j < keywords.length; j++) {
          if (!found && matches(results[x].items[i].keywords, keywords[j])) {
            found = true;
          }
        }

        if (!found) {
          results[x].items.splice(i, 1);
          i--;
        }
      }
    }
  }

  $("#content").html("");
  displayResults(results, search);
}

function displayResults(results, search) {
  var $resultsView = $("#content");

  for (var i = 0; i < results.length; i++) {
    if (results[i].items.length > 0) {
      $resultsView.append(createCategoryElement(results[i]));
      for (var j = 0; j < results[i].items.length; j++) {
        $resultsView.append(createFaqElement(results[i].items[j], search));
      }
    }
  }

  makeExpandable();
}

function createCategoryElement(category) {
  return "<h4>" + category.title + "</h4>";
}

function createFaqElement(faq, searchTerm) {
  var collapseContent = $("<div></div>").addClass("mdl-collapse__content mdl-animation--default")
      .html(faq.text + "<br/>");

  var collapseContentWrapper = $("<div></div>").addClass("mdl-collapse__content-wrapper")
      .html(collapseContent);

  var title = faq.title;
  if (title.indexOf(searchTerm) != -1) {
    title = title.replace(searchTerm, "<span class=\"highlighted\">" + searchTerm + "</span>");
  }

  var navLink = $("<a></a>").addClass("mdl-navigation__link mdl-collapse__button")
      .html("<i class=\"material-icons mdl-collapse__icon mdl-animation--default\">expand_more</i>" +
        title);

  var container = $("<div></div>").addClass("mdl-collapse")
      .html(navLink);

  container.append(collapseContentWrapper);
  return container;
}

function matches(text, query) {
  return text.toLowerCase().indexOf(query.toLowerCase()) != -1;
}
