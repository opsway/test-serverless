const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyw4MqnqKmmXo3W9'}).base('app4XSm2ynZKqT5LD');
const jsonfile = require('jsonfile');

base('Events').select({
  view: 'Grid view',
  maxRecords: 99999999,
  fields: ["ID", "Title", "Description", "Category", "Date", "Location", "Geoposition", "Site"],
  sort: [{ field: "Date", direction: "desc"}],
}).firstPage((err, records) => {
  if (err) return console.error('err ', err);
  
  const file = './events.json';
  records = records.map(record => record._rawJson);
  
  jsonfile.writeFileSync(file, records, {spaces: 2});
});