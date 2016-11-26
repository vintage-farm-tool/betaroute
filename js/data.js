function flatten(ary){
  return ary.reduce(function(a, b) {
    if (Array.isArray(b)) {
      return a.concat(flatten(b))
    }
    return a.concat(b)
  }, []);
}

$( function() {
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
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

var street_routes = flatten(digestRoute);
console.log('street_routes', street_routes)
var dataSet = [];
var edgeSet = [];
/*availableRoute.forEach(function(route){
  route.forEach(function(street, index){
    var obj = {id:index, label: street};
    dataSet.push(obj)
  });
});*/
for(var street in availableRoute){
  var from_pos = street_routes.indexOf(street);
  if(from_pos === -1){
    continue;
  }
  var obj = {id:from_pos, label: street};
  var links = availableRoute[street];
  dataSet.push(obj)
  console.log(street + ' links', links)
  links.forEach(function(item, index){
    var pos = street_routes.indexOf(item.name);
    if(pos > -1 && pos > from_pos){
        var point = {from: from_pos, to: pos, fname: street, tname: item.name};
        console.log(street + ' point',point );
        edgeSet.push(point);
    }
  });
}
console.log(edgeSet);


var nodes = new vis.DataSet(dataSet);

  // create an array with edges
  var edges = new vis.DataSet(edgeSet);

  // create a network
  var container = document.getElementById('route');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);