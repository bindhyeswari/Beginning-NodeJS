

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

    $scope.contact = {
        name: 'James',
        email: 'james@gmail.com',
        tel: '408 819 2356'
    };
    $scope.createContact = function () {
        console.log($scope.contact);

        $http.post('/contacts', $scope.contact).then(function (config) {
            console.log(config.data);
            $scope.contact = {};
        });
    }

    $scope.delete = function (contact) {
        console.log(contact);

        $http.delete('/contacts/' + encodeURIComponent(contact.email)).then(function (config) {
            console.log(config.data);
            var index = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(index, 1);
        });
    }
});