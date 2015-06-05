'use strict';

angular.module('docManApp')
  .controller('AddModalCtrl', function ($scope, $modalInstance) {
    $scope.docName = '';

    $scope.ok = function () {
      if($scope.docName.length < 1) {
        return;
      }
      $modalInstance.close($scope.docName);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
