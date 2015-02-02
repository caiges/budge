var billsControllers = angular.module('BudgeBillsControllers', ['ui.router', 'BudgeBillServices']);

billsControllers.controller('billsCtrl', ['$scope', 'billService', function($scope, billService) {
  $scope.bills = billService.bills;

  this.getBills = function() {
    billService.fetch();
  };

  $scope.$on('$stateChangeSuccess', this.getBills);
}]);

billsControllers.controller('newBillCtrl', ['$scope', '$state', 'billService', function($scope, $state, billService) {
  $scope.newBill = {};
  $scope.save = function(form) {
    if(form.$valid) {
      billService.save($scope.newBill);
      $state.go('bills');
    }
  };
}]);