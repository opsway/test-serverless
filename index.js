const getEvents = require('./getEventsFromAWS/exports').handler;

getEvents({
  queryStringParameters: {
    lat: 59.975007,
    lon: 30.284635,
    searchRadius: 11000,
  }
}, {}, (err, v) => console.log('err ', err, 'v ', v));
