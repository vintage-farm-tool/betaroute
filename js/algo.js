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
    test:function(){
      console.log('here');
    },
    init: function(payload, start, destination){
      this.payload = payload;
      this.start = start;
      this.destination = destination;
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
        if(payload[street] !== undefined){
          var links = payload[street]['links'];
          this.buildRoute(links, street);
        }
      }
      return this.routes;
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
};