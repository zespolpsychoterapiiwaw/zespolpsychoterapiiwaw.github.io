var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/psychotherapy.html',
            controller: 'psychotherapyController'
        })

        .when('/offer', {
            templateUrl: 'pages/offer.html',
            controller: 'offerController'
        })


        // route for the about page
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/psychotherapy', {
            templateUrl: 'pages/psychotherapy.html',
            controller: 'psychotherapyController'
        });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope) {
});

app.controller('aboutController', function ($scope, $sce) {
    $scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

    var jsonPath = "data/pl/team.json";
    if($scope.language === 'en'){
        jsonPath = "data/en/team.json";
    }
    $.getJSON(jsonPath, function(json) {
        $scope.team = json.team;
    })    
});

app.controller('psychotherapyController', function ($scope) {
    var jsonPath = "data/pl/psychotherapy.json";
    if($scope.language === 'en'){
        jsonPath = "data/en/psychotherapy.json";
    }
    $.getJSON(jsonPath, function(json) {
        article = json;
        $scope.article = article;
    })    
});

app.controller('offerController', function ($scope) {
    var jsonPath = "data/pl/offer.json";
    if($scope.language === 'en'){
        jsonPath = "data/en/offer.json";
    }
    $.getJSON(jsonPath, function(json) {
        article = json;
        $scope.article = article;
    })

});

app.directive('mapCanvas', function ($timeout) {
    return {
        templateUrl: 'pages/mapcanvas.html',
        restrict: 'E',
        scope: true,
        scope: {
            address: '@',
            selectormap: '@'
        },
        link: function (scope, element) {
            $timeout(function () {
    //DOM has finished rendering

            var geocoder = new google.maps.Geocoder();

            var mapOptions = {
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
            var map = new google.maps.Map(document.getElementById(scope.selectormap), mapOptions);
            if (geocoder) {
                geocoder.geocode({ 'address': scope.address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            map.setCenter(results[0].geometry.location);

                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                title: scope.address
                            });
                        } else {
                            alert("No results found");
                        }
                    }
                });
            }
        });
        }
    };
});


