$( function() {
  $('input').after('<img src="images/input-loader.svg" class="input-img field-loader">');

  $( ".street_data" ).autocomplete({
    source: availableTags
  });
} );
payload_test = {
  "ojuelegba":{
    "links":['ikorodu road', 'masha', 'Tejuosho Rd', 'yaba'],
    'town':'surulere',
    'ikorodu':{distance:12, duration:13}, 
    'masha':{distance:14, duration:10},
    'yaba':{distance:22, duration:43}
  },
  "yaba":{
    "links":['ojuelegba', 'Murtala Muhammed Way', 'Herber Macaulay', 'oyigbo road', 'yabatech'],
    'town':'surulere',
    'ikorodu':{distance:25, duration:23}, 
    'masha':{distance:32, duration:3}
  },
  "oyigbo road":{
    "links":['ozone', 'yaba'],
    "town": 'surulere',
    'ikorodu road':{distance:12, duration:23}, 
    'masha':{distance:12, duration:23},
    'yaba':{distance:10, duration:13}
  },
  "ozone":{
    "links":['sabo', 'oyigbo road', 'ilaje'],
    "town": 'surulere',
    'sabo':{distance:42, duration:33}, 
    'oyigbo road':{distance:12, duration:16},
    'ilaje':{distance:15, duration:27}
  },
  "herbert":{
    "links":['sabo', 'ozone'],
    "town": 'ikorodu',
    'sabo':{distance:18, duration:26}, 
    'ozone':{distance:10, duration:43}
  },
  "sabo":{
    "links":['alara', 'herbert', 'queens'],
    "town": 'ikorodu',
    'alara':{distance:22, duration:19}, 
    'herbert':{distance:10, duration:23}
  },
  "queens":{
    "links":['alara', 'sabo', 'onike'],
    "town": 'ikorodu',
    'alara':{distance:22, duration:19}, 
    'herbert':{distance:10, duration:23}
  },
  "alara":{
    "links":['funsho', 'sabo', 'onike'],
    "town": 'ikorodu',
    'funsho':{distance:42, duration:23}, 
    'sabo':{distance:34, duration:43},
    'onike':{distance:7, duration:8}
  },
  "funsho":{
    "links":['alara', 'iyanga'],
    "town": 'ikorodu',
    'alara':{distance:5, duration:3}, 
    'iyanga':{distance:32, duration:18}
  },
};

//var availableRoute = router.getRoutes();
//var street_routes = router.digestRoutes(true);
var config = {
  apiKey: "AIzaSyDpibXnEgx1Zm6a8wCbueypdlKYOuemLzg",
  authDomain: "andela-hackathon.firebaseapp.com",
  databaseURL: "https://andela-hackathon.firebaseio.com",
  storageBucket: "andela-hackathon.appspot.com",
  messagingSenderId: "771993023415"
};
var availableTags = [];
var payload = {};
firebase.initializeApp(config);
var database = firebase.database();
app.loadData(database);