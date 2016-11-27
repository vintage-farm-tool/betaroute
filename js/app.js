
var app = {
  data: null,
  loadData: function(database){
    var starCountRef = database.ref('mainstreets');
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
      $('.field-loader').fadeOut('slow');
      $('.street_data').attr('disabled', false);
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
    if(this.data === null){
      var nodes = new vis.DataSet(dataSet);
      var edges = new vis.DataSet(edgeSet);
      var container = document.getElementById('route');
      var data = {
        nodes: nodes,
        edges: edges
      };
      this.data = data;
      var network = new vis.Network(container, data, {});
    }else{
      this.data.nodes.clear();
      this.data.edges.clear();
      this.data.nodes.update(dataSet);
      this.data.edges.update(edgeSet);
    }
    
    
    
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