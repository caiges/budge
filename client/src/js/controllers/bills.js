var billsControllers = angular.module('BudgeBillsControllers', []);

billsControllers.controller('billsCtrl', ['$scope', function($scope) {

}]);

billsControllers.controller('newBillCtrl', ['$scope', function($scope) {
  $scope.newBill = {};
  $scope.save = function(form) {
    if(form.$valid) {
    }
  };
}]);