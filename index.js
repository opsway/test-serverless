const fields = [
'#',
'Название',
'Описание',
'Дата создания',
'Место',
'Координаты',
'Сайт',
];

var x = document.getElementById("position");

const showPosition = position => {
  x.innerHTML = "Latitude: " + position.coords.latitude.toFixed(6) +
    "<br> Longitude: " + position.coords.longitude.toFixed(6);
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const renderTable = (params) => {
  $.ajax({
    type: 'GET',
    url: 'https://gyqv2q06tb.execute-api.eu-central-1.amazonaws.com/development/events',
    data: params,
    success: events => {
      $('#app').append('<table class="table-bordered" id="table">');
      
      const thead = $('<thead>')
      const tr = $('<tr class="header">');
      fields.forEach(field => {
        const td = $(`<td>${field}</td>`);
        tr.append(td);
      });
      thead.append(tr);
      $('#app table').append(thead);
      
      const tbody = $('<tbody>');
      events.forEach(event => {
        const fields = event.fields;
        const fieldsCounter = Object.keys(fields).length;
        
        if (fieldsCounter == 8) {
          const tr = $('<tr/>');
          for (let prop in fields) {
            if (prop !== 'Category') {
              const td = $('<td>').text(fields[prop]);
              tr.append(td);
            }
          }
          tbody.append(tr);
        }
      });
      
      $('#app table').append(tbody);
    }
  });
};

const search = () => {
  $('#app')[0].innerHTML = '';
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);
    const searchRadius = $('#r')[0].value;
    if (lat && lon && searchRadius) {
      renderTable({ lat, lon, searchRadius });
    }
  });
};

getLocation();
renderTable();
