var billsControllers = angular.module('BudgeBillsControllers', ['ui.router', 'BudgeBillServices']);

billsControllers.controller('billsCtrl', ['$scope', 'billService', function($scope, billService) {
  $scope.bills = billService.bills;

  this.getBills = function() {
    billService.fetch();
  };

  $scope.$on('$stateChangeSuccess', this.getBills);
}]);

billsControllers.controller('newBillCtrl', ['$scope', '$state', 'billService', function($scope, $state, billService) {
  $scope.bill = {};
  $scope.save = function(form) {
    if(form.$valid) {
      billService.save($scope.bill);
      $state.go('bills');
    }
  };
}]);

billsControllers.controller('editBillCtrl', ['$scope', '$state', '$stateParams', 'billService', function($scope, $state, $stateParams, billService) {
  $scope.bill = {};
  $scope.save = function(form) {
    if(form.$valid) {
      billService.update($scope.bill);
      $state.go('bills');
    }
  };

  this.getBill = function() {
    var bill = billService.get($stateParams.id);
    if(bill != null) {
      $scope.bill = bill;
    }
  };

  $scope.$on('$stateChangeSuccess', this.getBill);
}]);