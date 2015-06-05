'use strict';

angular.module('docManApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $location.path('/dashboard');
    };

  });
