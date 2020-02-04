let dashboard = angular.module('dashboard', ['ngRoute'])

dashboard.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'home.html',
      controller: 'homeController'
    })
    .when('/users', {
      templateUrl: 'users.html',
      controller: 'usersController'
    })
})

dashboard.controller('usersController', function ($scope, $rootScope, userService) {
  $scope.message = "Controller 1111";
  
  $rootScope.$on('evt', function(){
    let t = userService.getData();
    $scope.users = t;
  })

})

dashboard.controller('homeController', function ($scope, userService) {

  $scope.message = "Controller 2222";

  $scope.sendData = function() {
    let d = $scope.users;
    userService.setData(d);
  }

})

dashboard.service('userService', function ($rootScope) {
  
  this.tempData = '';

  this.setData = function (d) {
    this.tempData = d;
    $rootScope.$emit('evt');
  }

  this.getData = function () {
    return this.tempData;
  }
})