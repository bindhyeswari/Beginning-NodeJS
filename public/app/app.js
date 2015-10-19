

var app = angular.module('githubApp', []);

app.controller('GithubController', function ($scope, $http) {
    $scope.message = 'Hello World from Angular';

    $http.get('/james').then(function (config) {
        $scope.items = config.data.items;
    });
});

app.controller('ContactsController', function ($scope, $http) {
    $scope.getContacts = function () {
        // make the call and get the contacts

        $http.get('/contacts').then(function (config) {
            $scope.contacts = config.data;
        });

    };
});