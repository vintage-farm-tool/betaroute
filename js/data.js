$( function() {
  var availableTags = [
    "ActionScript", "AppleScript", "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  $( "#auto-input" ).autocomplete({
    source: availableTags
  });
} );

var nodes = new vis.DataSet(router.dataSet);

// create an array with edges
var edges = new vis.DataSet(router.edgeSet);

// create a network
var container = document.getElementById('route');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);