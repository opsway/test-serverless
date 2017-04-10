const getEvents = require('./getEvents/exports').handler;

getEvents({
  queryStringParameters: {
    lat: 50.461001,
    lon: 30.351268,
    searchRadius: 100,
  }
}, {}, (err, v) => console.log('err ', err, 'v ', v));
