const Airtable = require('airtable');
const getDistance = require('./getDistance');

exports.handler = (event, context, callback) => {
  const queryStringParameters = event.queryStringParameters;
  const base = new Airtable({apiKey: 'keyw4MqnqKmmXo3W9'}).base('app4XSm2ynZKqT5LD');

  base('Events').select({
    view: 'Grid view',
    maxRecords: 99999999,
    fields: ["ID", "Title", "Description", "Date", "Location", "Geoposition", "Site", "Picture", "Category"],
    sort: [{ field: "Date", direction: "desc"}],
  }).firstPage((err, records) => {
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

    records = records.map(record => record._rawJson);

    if (queryStringParameters && queryStringParameters.category) {
      records = records.filter(record => {
        if (record.fields.Category) {
          return (record.fields.Category.indexOf(queryStringParameters.category) !== -1);
        }

        return false;
      });
    }

    if (queryStringParameters && queryStringParameters.lat && queryStringParameters.lon && queryStringParameters.searchRadius) {
      records = records.filter(record => {
        if (!record.fields.Geoposition) return false;

        const distance = getDistance(parseFloat(queryStringParameters.lat), parseFloat(queryStringParameters.lon), record.fields.Geoposition);
        return distance.human_readable().distance <= parseInt(queryStringParameters.searchRadius);
      });
    }

    records = records.map(record => {
      delete record.fields.Category;
      return record;
    });

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
