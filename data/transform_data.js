// Transform the data in data.json into a format that is closer to what we
// need so that there is less processing required in the app itself
var data = require('./data.json');

// First make a mapping of park ids to park names
var mapping = {}
data.parks.forEach(function(park) {
  mapping[park.id] = park.longName
});

data.campsites = data.campsites.map(function(campsite) {
  var lat = campsite.latitude
  var lng = campsite.longitude
  // Some of the position data in data.json is accidently included as strings
  // Let's fix this here
  if (typeof(lat) == "string") {
    lat = Number(lat)
  }
  if (typeof(lng) == "string") {
    lng = Number(lng)
  }

  var barbecues = campsite.barbecues
  if (barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
    barbecues = "wood"
  }

  var position = null;
  if (lat && lng) {
    position = { lat: lat, lng: lng }
  }

  return ({
    id: campsite.id,
    name: campsite.longName,
    parkName: mapping[campsite.park],
    description: campsite.description,
    position: position,
    facilities: {
      toilets: campsite.toilets,
      picnicTables: campsite.picnicTables,
      barbecues: barbecues,
      showers: campsite.showers,
      drinkingWater: campsite.drinkingWater
    },
    access: {
      caravans: campsite.caravans,
      trailers: campsite.trailers,
      car: campsite.car
    }
  });
});

var fs = require('fs');
fs.writeFileSync('data/data_simplified.json', JSON.stringify(data.campsites, null, 2));
