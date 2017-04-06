const Airtable = require('airtable');

exports.handler = (event, context, callback) => {
  const base = new Airtable({apiKey: 'keyw4MqnqKmmXo3W9'}).base('app4XSm2ynZKqT5LD');
  
  base('Category').select({
    view: 'Grid view'
  }).firstPage(function(err, records) {
    if (err) { callback(err); return; }
    
    records = records.map(record => record._rawJson);
    
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(records),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
};