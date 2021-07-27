function dispActiveAndDeaths(res) {
    $("#activedeaths").html(
        $('<article class="activedeaths">').append(
            $('<h3>').text('Active: ' + res.features[0].attributes.Cases),
            $('<h3>').text('Deaths: ' + res.features[0].attributes.Deaths)
        )
    );
}

$(document).ready(function() {
	$.ajax({
		url: "https://services1.arcgis.com/vHnIGBHHqDR6y0CR/arcgis/rest/services/Current_Cases_by_State/FeatureServer/0/query?where=1%3D1&outFields=Cases,Deaths&outSR=4326&f=json",
		dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise XSS).
		cache: true,
		success: function(res) {
			dispActiveAndDeaths(res);
		}
	});
});