var app = angular.module('budgeApp', ['ui.router', 'BudgeOverviewController', 'BudgeBillsControllers']);

app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('overview', {
      url: '/',
      authenticate: true,
      controller: 'budgeOverviewCtrl'
    })
    .state('bills', {
      url: 'bills',
      authenticate: true,
      controller: 'billsCtrl',
      templateUrl: '/templates/bills/index.html'
    })
    .state('signin', {
      url: '/signin',
      authenticate: false,
      controller: 'budgeAuthenticationCtrl',
      templateUrl: '/templates/sessions/new.html'
    })
    .state('signout', {
      url: '/signout',
      authenticate: false,
      controller: 'budgeSignOutCtrl'
    });

}]);
