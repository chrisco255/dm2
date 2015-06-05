'use strict';

angular.module('docManApp')
  .controller('EditModalCtrl', function ($scope, $modalInstance, selectedDoc) {
    $scope.docName = selectedDoc.name;

    $scope.ok = function () {
      if($scope.docName.length < 1) {
        return;
      }
      selectedDoc.name = $scope.docName;
      selectedDoc.modified = moment().format('MMM Do YY, h:mm a');
      $modalInstance.close($scope.docName);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
