omaProject = angular.module('omaProjectIndex', []);

var jsonFile = '../releases.json';

omaProject.controller('ReleaseController', function ($scope, $http) {
    var $this = this;

    $http.get(jsonFile)
        .success(function (result) {
            $scope.releaseList = result;
        })
        .error(function () {
            //$scope.errorMessage = "<p>Error... " + textStatus + "        " + errorThrown + "</p><p>" + jqXHR.responseText + "</p>";
            $scope.errorMessage = "Error loading JSON file - " + jsonFile + ": Please check the JSON data is correct";
        });
});