$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: 'https://gyqv2q06tb.execute-api.eu-central-1.amazonaws.com/development/events',
    success: events => {
      console.log('success response: ', events);
      $('#table').append('<table class="table-bordered"/>');
  
      events.forEach(event => {
        const fields = event.fields;
        const fieldsCounter = Object.keys(fields).length;
        
        if (fieldsCounter == 8) {
          const tr = $('<tr/>');
          for (let prop in fields) {
            tr.append(`<td>${fields[prop]}</td>`);
          }
          $('#table table').append(tr);
        }
      });
    }
  });
});