var app = angular.module('myApp',  ['ngRoute', 'ngAnimate']);

// configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/welcome.html',
                controller  : 'aboutController'
            })

            .when('/offer', {
                templateUrl : 'pages/offer.html',
                controller  : 'offerController'
            })


            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    app.controller('mainController', function($scope) {
    });

    app.controller('aboutController', function($scope) {
$scope.initialize = function(){
    /* google maps */
google.maps.visualRefresh = true;

$scope.maps = [];

function initializeAllMaps()
{
    if($scope.maps.length ==3)
    {
        return;
    }
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
            $scope.maps.push(map);
          } else {  
          	alert("No results found");
          }
        }
      });
	}
}
initializeAllMaps();

/* end google maps *//* end google maps */}; 
$scope.initialize();
    });

    app.controller('contactController', function($scope) {
    });

    app.controller('offerController', function($scope) {
    });



