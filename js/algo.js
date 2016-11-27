var router = {
  visited:{},
  routes:{},
  payload:{},
  start: null,
  destination: null,
  streets:[],
  mainRoute: [],
  availableRoutes: [],
  foundARoute: false,
  dataSet: [],
  edgeSet: [],
  init: function(payload, start, destination){
    this.payload = payload;
    this.start = start;
    this.destination = destination;
  },
  execute: function(singlePart){
    if(this.start == this.destination)
      return false;
    that = this;
    return new Promise(function(resolve, reject){
      that.getRoutes();
      that.digestRoutes();
      that.generateDataSet(singlePart);
      resolve({dataSet: that.dataSet, edgeSet: that.edgeSet});
    });
    
  },
  getRoutes: function(){
    this.visited = {};
    this.routes = {};
    this.streets = [];
    this.streets.push(this.start);
    this.visited[this.start] = true;
    
    while(this.streets.length !== 0){
      street = this.streets[0];
      this.streets.shift();
      if(this.payload[street] !== undefined){
        var links = this.payload[street]['links'];
        this.buildRoute(links, street);
      }
    }
    console.log(this.availableRoutes);
    return this.routes;
  },
  buildRoute: function(links, parent_street){
    this.routes[parent_street] = [];
    for(var i = 0; i < links.length; i++){
      var current_street = links[i];
      if(!this.visited[current_street]){
        this.streets.push(current_street);
        this.visited[current_street] = true;
      }
      length = this.routes[parent_street].length;
      if(current_street != this.start)
        this.routes[parent_street][length] = {name: current_street, status: false};
    
      if(current_street == this.destination){
        this.routes[parent_street][length].status = true;
        return true;
      }
    }
  },
  digestRoutes: function(flatten){
    var startPointLinks = this.routes[this.start];
    this.visited = {};
    
    for(var index in startPointLinks){
      streetData = startPointLinks[index];
      this.mainRoute = [];
      this.foundARoute = false;
      if(this.routes[streetData.name] !== undefined){
          this.mainRoute.push(this.start);
          
          this.visited[this.start] = true;
          this.visited[streetData.name] = true;
          this.mainRoute.push(streetData.name);
          this.getMainRoute(streetData.name);
      }
      if(this.foundARoute){
        this.availableRoutes.push(this.mainRoute);
      }
    }
    if(flatten){
      return this.flatten(this.availableRoutes);
    }
    return this.availableRoutes;
  },
  getMainRoute: function(street){
    for(var i = 0; i < this.routes[street].length; i++){
       var streetData = this.routes[street][i];
       if(this.visited[streetData.name]){
         continue;
       }
       this.visited[streetData.name] = true;
       if(streetData.status === true){
          this.mainRoute.push(streetData.name);
          this.availableRoutes.push(this.mainRoute);
          this.mainRoute = [];
          this.foundARoute = true;
          break;
        }
        
        if(this.routes[streetData.name] !== undefined){
          this.mainRoute.push(streetData.name);
          this.getMainRoute(streetData.name);
        }
    }
  },
  generateDataSet: function(singlePart){
    var street_routes = this.flatten(this.availableRoutes);
    that = this;
    for(var street in this.routes){
      var from_pos = street_routes.indexOf(street);
      if(from_pos === -1){
        continue;
      }
      var color = '#97c2fc';
      if(street == this.start)
        color = '#4ed027'
      if(street == this.destination)
        color = '#f77348'
      var obj = {id:from_pos, label: street, color: color };
      var links = this.routes[street];
      this.dataSet.push(obj);
      links.forEach(function(item, index){
        var pos = street_routes.indexOf(item.name);
        if(pos > -1 && pos != from_pos){
          if(singlePart && pos < from_pos)
            return false

            var point = {from: from_pos, to: pos, fname: street, tname: item.name};
            that.edgeSet.push(point);
        }
      });
    }
  },
  flatten: function (ary){
    that = this;
    return ary.reduce(function(a, b) {
      if (Array.isArray(b)) {
        return a.concat(that.flatten(b))
      }
      return a.concat(b)
    }, []);
  }

};