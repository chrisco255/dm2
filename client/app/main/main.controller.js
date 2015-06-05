'use strict';

angular.module('docManApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location) {
    var vm = this;

    vm.awesomeThings = [];
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/things').success(function(awesomeThings) {
      vm.awesomeThings = awesomeThings;
    });

    vm.addThing = function() {
      if(vm.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: vm.newThing });
      vm.newThing = '';
    };

    vm.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    vm.login = function() {
      $location.path('/dashboard');
    };
  });
