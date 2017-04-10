const request = require('superagent');
const getDistance = require('./getDistance');

exports.handler = (event, context, callback) => {
  const queryStringParameters = event.queryStringParameters;
  
  request
    .get('https://s3.eu-central-1.amazonaws.com/airdrop-database/events.json')
    .set('Accept', 'application/json')
    .end((err, records) => {
      if (err) {
        return callback(err, {
          statusCode: 500,
          body: JSON.stringify(err),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method' : 'GET, OPTION',
            'Access-Control-Allow-Origin' : '*',
          }
        });
      }
      
      records = records.body;
      
      if (queryStringParameters && queryStringParameters.lat && queryStringParameters.lon && queryStringParameters.searchRadius) {
        records = records.filter(record => {
          if (!record.fields.Geoposition) return false;
          
          const distance = getDistance(parseFloat(queryStringParameters.lat), parseFloat(queryStringParameters.lon), record.fields.Geoposition);
          return distance.human_readable().distance <= queryStringParameters.searchRadius;
        });
      }
      
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(records),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Method' : 'GET, OPTION',
          'Access-Control-Allow-Origin' : '*'
        }
      });
  });
};