  // Load google charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  var o = 0, lu = 0, lk = 0, is = 0;

  var colour = "black";

  var ofive = 0, fiveten = 0, tenfifteen = 0, fifteentwenty = 0, twentytfive = 0, tfivethirty = 0, thirtyt5 = 0,
  t5forty = 0, fortyf5 = 0, f5fifty = 0, fiftyf5 = 0, f5sixty = 0, sixtys5 = 0, s5seventy = 0, seventyplus = 0;

  function iterate(data2) {
    $.each(data2.result.records, function(recordKey, recordValue) {
        // get chart of likely source of infection
        var ageRange = recordValue["age_group"];
        if (ageRange === 'AgeGroup_0-4') {
            ofive++;
        } else if (ageRange === 'AgeGroup_5-9') {
            fiveten++;
        } else if (ageRange === 'AgeGroup_10-14') {
            tenfifteen++;
        } else if (ageRange === 'AgeGroup_15-19') {
            fifteentwenty++;
        } else if (ageRange === 'AgeGroup_20-24') {
            twentytfive++;
        } else if (ageRange === 'AgeGroup_25-29') {
            tfivethirty++;
        } else if (ageRange === 'AgeGroup_30-34') {
            thirtyt5++;
        } else if (ageRange === 'AgeGroup_35-39') {
            t5forty++;
        } else if (ageRange === 'AgeGroup_40-44') {
            fortyf5++;
        } else if (ageRange === 'AgeGroup_45-49') {
            f5fifty++;
        } else if (ageRange === 'AgeGroup_50-54') {
            fiftyf5++;
        } else if (ageRange === 'AgeGroup_55-59') {
            f5sixty++;
        } else if (ageRange === 'AgeGroup_60-64') {
            sixtys5++;
        } else if (ageRange === 'AgeGroup_65-69') {
            s5seventy++;
        } else if (ageRange === 'AgeGroup_70+') {
            seventyplus++;
        }
      });
  }

  function iterateRecords(data) {
    var mul = 10;
    var count = 0;
    var casesInSuburb = 0;
    var safetyAlert = "";
    var tips = false;
    var layers = true;

    //make a new date
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate() - 1;

    var output = d.getFullYear() + '-' + 
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day;

    $.each(data.result.records, function(recordKey, recordValue) {
      var recordDate = recordValue["notification_date"];
      if (recordDate === '' + output) {
        count++;
      }
      // get chart of likely source of infection
	  
      var source = recordValue["likely_source_of_infection"];
      if (source === 'Overseas') {
          o++;
      } else if (source === 'Locally acquired - source not identified') {
          lu++;
      } else if (source === 'Locally acquired - contact of a confirmed case and/or in a known cluster') {
          lk++;
      } else if (source === 'Interstate') {
          is++;
      }
    });
  // Setup the map as per the Leaflet instructions:
  // https://leafletjs.com/examples/quick-start/

  // map
  var map = new L.map('map')
  map.setView([-33.865143, 151.209900], 10);
  var searchControl = L.esri.Geocoding.geosearch().addTo(map);
  var results = L.layerGroup().addTo(map);
  var button = document.getElementById("layertoggle");
 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  threed.addEventListener('click', function(event) {
    layers =! layers;
    if (layers){
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    $("#threed").html("3D");
    } else{
    new L.TileLayer('https://api.mapbox.com/styles/v1/osmbuildings/cjt9gq35s09051fo7urho3m0f/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib3NtYnVpbGRpbmdzIiwiYSI6IjNldU0tNDAifQ.c5EU_3V8b87xO24tuWil0w', {
      attribution: '© Map <a href="https://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      maxNativeZoom: 20
    }).addTo(map);
  
    var osmb = new OSMBuildings(map).load();
    $("#threed").html("2D");
    }
  })


  searchControl.on('results', function (result) {
    results.clearLayers();
    var type = result.results[0].properties.Addr_type;
    var searchSuburb = result.results[0].properties.District;
    var city = result.results[0].properties.City;
	var nbrhd = result.results[0].properties.Nbrhd;
    var region = result.results[0].properties.ShortLabel;
    var searchRegion;
    if (type === "StreetName" || type === "POI") {
      searchRegion = searchSuburb;
    }
    if (type === "Locality") {
      if (searchSuburb !== "" && city !== "") {
        searchRegion = searchSuburb;
      }
      if (region === city || city === "") {
        searchRegion = region;
      }
    }
	if (type === "PointAddress") {
		searchRegion = nbrhd;
	}
    $.each(data.result.records, function(recordKey, recordValue) {
      var recordDate = recordValue["notification_date"];
      var suburb = recordValue["lga_name19"];
      var area = recordValue["lhd_2010_name"];
      if (suburb != null && suburb != '' && recordDate === '' + output) {
          if (subString(suburb, searchRegion) || subString(area, searchRegion)) {
            casesInSuburb++;
          }
        }
    });
    if (casesInSuburb === 0) {
      mul = 1;
      safetyAlert = "SAFE";
      colour = "green";
    } else if (casesInSuburb > 0 && casesInSuburb < 10) {
      mul = 2;
      safetyAlert = "LOW CHANCE";
      colour = "lightgreen"
    } else if (casesInSuburb > 10 && casesInSuburb < 30) {
      mul = 4;
      safetyAlert = "MILDLY UNSAFE";
      colour = "yellow"
    } else if (casesInSuburb > 30 && casesInSuburb < 60) {
      mul = 6;
      safetyAlert = "MODERATE";
      colour = "orange"
    } else if (casesInSuburb > 60 && casesInSuburb < 100) {
      mul = 8;
      safetyAlert = "UNSAFE!"
      colour = "red";
    } else if (casesInSuburb > 100) {
      mul = 10;
      safetyAlert = "VERY UNSAFE!";
      colour = "crimson";
    }
    for (var i = result.results.length - 1; i >= 0; i--) {
      console.log(result.results[i]);
      var circle = L.circle(result.results[i].latlng, {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 500*mul
    })
      results.addLayer(circle);
      circle.bindPopup("<strong>"+ searchRegion + "</strong><br>" + casesInSuburb + " cases").openPopup();
    };
    tips = true;
    casesInSuburb = 0;
  
    $("#safety").html(
      $('<article class="safety">').append(
          $('<h2>').text('Your Safety Ranking Is: ' + (tips ? safetyAlert : '')).css('color', colour)
      )
    );
  });

	$("#records").html(
		$('<article class="record">').append(
          $('<h2>').text('Daily count: ' + count) 
        )
    );

  $("#date").append(
    $('<h2>').text('' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '/' + 
        ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '/' + 
        d.getFullYear()
    )
  );
  
  $("#safety_tips").html(
	  $('<article class="safety_tips">').append(
	    $('<p>').text('Stay safe by:'),
	    $('<ul>').append(
		  $('<li>').text("Washing your hands"),
		  $('<li>').text("Maintaining social distance of 1.5 m"),
		  $('<li>').text("Checking government updates & obeying rules and regulations")
	    )
	  )
    );
	
	$("#safety").html(
      $('<article class="safety">').append(
          $('<h2>').text('Your Safety Ranking Is: ')
      )
    );
}

function subString(str, substr) {
  var index = str.search(substr);
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
}

function drawChart(data) {
  var draw = google.visualization.arrayToDataTable([
        ['Likely source of Infection', 'Number'],
        ['Overseas', o],
        ['Locally Acquired - Source Not Known', lu],
        ['Locally Acquired - Confirmed', lk],
        ['Interstate', is],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Likely Sources of Infection', 'width':400, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(draw, options);

  var drawLine = google.visualization.arrayToDataTable([
    ['Cases By Age Range', 'Number'],
    ['AgeGroup_0-4', ofive],
    ['AgeGroup_5-9', fiveten],
    ['AgeGroup_10-14', tenfifteen],
    ['AgeGroup_15-19', fifteentwenty],
    ['AgeGroup_20-24', twentytfive],
    ['AgeGroup_25-29', tfivethirty],
    ['AgeGroup_30-34', thirtyt5],
    ['AgeGroup_35-39', t5forty],
    ['AgeGroup_40-44', fortyf5],
    ['AgeGroup_45-49', f5fifty],
    ['AgeGroup_50-54', fiftyf5],
    ['AgeGroup_55-59', f5sixty],
    ['AgeGroup_60-64', sixtys5],
    ['AgeGroup_65-69', s5seventy],
    ['AgeGroup_70+', seventyplus],
  ]);

  // Optional; add a title and set the width and height of the chart
  var lineOptions = {"title":"Cases By Age Range", "width":400, "height":400};

  // Display the chart inside the <div> element with id="barchart"
  var linechart = new google.visualization.ColumnChart(document.getElementById('barchart'));
  linechart.draw(drawLine, lineOptions);
}

$(document).ready(function() {
    var data = {
        resource_id: "2776dbb8-f807-4fb2-b1ed-184a6fc2c8aa",
        limit: 100000
    };

    $.ajax({
        url: "https://data.nsw.gov.au/data/api/3/action/datastore_search?",
        data: data,
        dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise XSS).
        cache: true,
        success: function(data) {
          iterateRecords(data);
          drawChart(data);

          var data2 = {
            resource_id: "24b34cb5-8b01-4008-9d93-d14cf5518aec",
            limit: 100000
          };
    
          $.ajax({
              url: "https://data.nsw.gov.au/data/api/3/action/datastore_search?",
              data: data2,
              dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise XSS).
              cache: true,
              success: function(data2) {
                  iterate(data2);
                  drawChart(data2);
              }
          });
        }
    });
});