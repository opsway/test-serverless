const fields = [
'#',
'Название',
'Описание',
'Дата проведения',
'Место',
'Координаты',
'Сайт',
'Картинка',
];

var x = document.getElementById("position");

x.innerHTML = "Latitude: -" +
    "<br> Longitude: -";

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

$( document ).ajaxStart(function() {
  $('#spinner').show();
});

$( document ).ajaxStop(function() {
  $('#spinner').hide();
});

const renderSelectBox = () => {
  $.ajax({
    type: 'GET',
    url: 'https://gyqv2q06tb.execute-api.eu-central-1.amazonaws.com/development/categories',
    success: categories => {
      categories.forEach(category => {
        if (category.fields.Name) {
          $('#categories').append($('<option>', {
            value: category.id,
            text: category.fields.Name,
          }));
        }
      });
    }
  });
};

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

        if (fieldsCounter == 8 || fieldsCounter == 7) {
          const tr = $('<tr/>');
          for (let prop in fields) {
            if (prop !== 'Picture') {
              const td = $('<td>').text(fields[prop]);
              tr.append(td);
            } else {
              const td = $('<td>');
              const img = $(`<img src="${fields[prop][0].url}" class="image">`);
              td.append(img);
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
    console.log('inside getCurrentPosition');
    const params = {};
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);
    const searchRadius = $('#r')[0].value;

    const category = $('#categories').val();

    if (category !== '0') {
      params.category = category;
    }

    if (lat && lon && searchRadius) {
      params.lat = lat;
      params.lon = lon;
      params.searchRadius = searchRadius;
    }

    renderTable(params);
  }, () => {
    const params = {};
    const category = $('#categories').val();
    if (category !== '0') {
      params.category = category;
    }
  
    renderTable(params);
  });
};

const radiusChange = val => {
  $('#radiusValue').text(val);
};

renderSelectBox();
getLocation();
renderTable();
