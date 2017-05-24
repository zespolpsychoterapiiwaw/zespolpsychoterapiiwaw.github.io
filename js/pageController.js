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
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    app.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    app.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    app.controller('offerController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });



