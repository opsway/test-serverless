const Distance = require('geo-distance');

module.exports = (lat, lon, geoPositionString) => {
  const parsedData = geoPositionString.split(',');
  const parsedLat = parseFloat(parsedData[0]);
  const parsedLon = parseFloat(parsedData[1]);
  
  return Distance.between({ lat, lon }, { lat: parsedLat, lon: parsedLon });
};
