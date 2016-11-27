
var app = {
  loadData: function(database){
    var starCountRef = database.ref('streets');
    starCountRef.on('value', function(snapshot) {
      var data = snapshot.val();
      for(var street in data){
        var links = data[street].links;
        if(links){
          if(links[0] != 'test'){
              if(availableTags.indexOf(street) === -1){
                  availableTags.push(street);
                  payload[street] = data[street];

              }
          }
        }
      }
    });
  },
  route: function(payload, start, destination, singlePart){
    //console.log(payload, start, destination);
    router.init(payload, start, destination);
    router.execute(singlePart).then(function(result){
      app.plotRoute(result.dataSet, result.edgeSet);
    });
    
  },
  plotRoute: function(dataSet, edgeSet){
    this.showResult($('#result-section'), $('.back-link'), $('.result-link'));
    var nodes = new vis.DataSet(dataSet);
    var edges = new vis.DataSet(edgeSet);
    var container = document.getElementById('route');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var network = new vis.Network(container, data, {});
    
  },
  showResult: function (section, hidden_link, shown_link) {
      this.scrollTo (section, 800);
      hidden_link.removeClass('no-display');
      shown_link.addClass('no-display');
  },
  scrollTo: function (section, speed) {
      $('html, body').stop().animate({
          scrollTop: section.offset().top
      }, speed, 'swing');
  }
}