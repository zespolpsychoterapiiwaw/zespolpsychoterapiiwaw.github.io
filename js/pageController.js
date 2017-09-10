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
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
            
        })

        .when('/psychotherapy', {
            templateUrl: 'pages/psychotherapy.html',
            controller: 'psychotherapyController'
        });
        
});

app.factory('dataService', function ($q, $timeout) {
    return {
        getData: function (name, language) {
            var jsonPath = "data/pl/" + name + ".json";
            if (language === 'en') {
                jsonPath = "data/en/" + name + ".json";
            }
            return $.getJSON(jsonPath);

        }
    };
});

// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope, $timeout, $route) {
    $scope.data = {};
    $scope.data.language = 'pl'

    $scope.changeLanguage = function () {
        if ($scope.data.language == 'pl') {
            $scope.data.language = 'en';
        }
        else {
            $scope.data.language = 'pl';
        }
    }
    $scope.reload = function () {
        var commonPath = "data/pl/common.json";
        if ($scope.data.language === 'en')
            commonPath = "data/en/common.json";
        $.getJSON(commonPath, function (json) {
            $scope.common = json;
            $route.reload();
        })
    };

    $scope.reload();
});

app.controller('aboutController', function ($scope, $sce, dataService) {
    $scope.renderHtml = function (html_code) {
        return $sce.trustAsHtml(html_code);
    };
    dataService.getData('team', $scope.$parent.data.language).then(function (resp) {
        $scope.team = resp.team;
        $scope.$apply();
        
    })
});

app.controller('contactController', function ($scope, $sce, dataService) {
    $scope.renderHtml = function (html_code) {
        return $sce.trustAsHtml(html_code);
    };
    dataService.getData('team', $scope.$parent.data.language).then(function (resp) {
        $scope.team = resp.team;
        $scope.$apply();
        
    })
});


app.controller('psychotherapyController', function ($scope, $sce, dataService) {
    $scope.renderHtml = function (html_code) {
        return $sce.trustAsHtml(html_code);
        
        $scope.trust = $sce.trustAsHtml;

    };

    dataService.getData('psychotherapy', $scope.$parent.data.language).then(function (resp) {
        console.log("Response:");
        console.log(resp);
        $scope.article = resp;
        $scope.$apply();
    })
});

app.controller('offerController', function ($scope, dataService) {
    dataService.getData('offer', $scope.$parent.data.language).then(function (resp) {
        $scope.article = resp;
        $scope.$apply();        
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


