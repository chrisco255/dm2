'use strict';

angular.module('docManApp')
  .controller('DeleteModalCtrl', function ($scope, $modalInstance, selectedDocs) {
    $scope.selectedDocs = selectedDocs;

    $scope.ok = function () {
      $modalInstance.close(selectedDocs);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
