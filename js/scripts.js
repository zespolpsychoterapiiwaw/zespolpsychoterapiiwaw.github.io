
$(document).ready(function(){;

/* affix the navbar after scroll below header */
    $('#nav').affix({
        offset: {
            top: $('header').height()
        }
    });



    /* google maps */
google.maps.visualRefresh = true;

var maps = [];

function initializeAllMaps()
{
    initialize('map-canvas1','ul. Waryńskiego 9, Warszawa')
    initialize('map-canvas2','ul. Puławska 103, Warszawa,')
    initialize('map-canvas3','ul. Jasna 1, Warszawa,')
}

function initialize(id,address) {
	var geocoder = new google.maps.Geocoder();
	var mapOptions = {
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
     	scrollwheel: false
	};
	var map = new google.maps.Map(document.getElementById(id),mapOptions);

  	if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title:address
            });
            maps.push(map);
          } else {
          	alert("No results found");
          }
        }
      });
	}
}
google.maps.event.addDomListener(window, 'load', initializeAllMaps);

/* end google maps */
});