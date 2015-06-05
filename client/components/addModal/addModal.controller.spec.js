'use strict';

describe('Controller: AddModalCtrl', function () {

  // load the controller's module
  beforeEach(module('docManApp'));

  var AddModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddModalCtrl = $controller('AddModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
