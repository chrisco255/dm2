'use strict';

describe('Controller: DeleteModalCtrl', function () {

  // load the controller's module
  beforeEach(module('docManApp'));

  var DeleteModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteModalCtrl = $controller('DeleteModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
