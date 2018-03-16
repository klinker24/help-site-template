var faq = [{
  title: "Help Category One",
  items: [{
    keywords: "test help category one first topic",
    title: "Here is topic #1",
    text: "Your expanded text goes here. You can add any HTML formatting that you want." + brbr() +
      "There are some helpers for " + link("links", "https://messenger.klinkerapps.com")
  }, {
    keywords: "test help category two second topic",
    title: "Here is topic #2",
    text: "I could continue making more topics, but don't really need to. You get the picture."
  }]
}, {
  title: "Help Category Two",
  items: [{
    keywords: "test help category three third topic",
    title: "Here is topic #3",
    text: "Just another expandable topic here. Make as many as you want."
  }]
}, {
  title: "Help Category Three",
  items: [{
    keywords: "test help category four forth topic",
    title: "Here is topic #4",
    text: "Ok, last example."
  }]
}]

function link(text, link) {
  return "<a href=\"" + link + "\" target=\"blank\">" + text + "</a>";
}

function brbr() {
  return br() + br();

}

function br() {
  return "<br/>";
}
