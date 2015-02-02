var app = angular.module('budgeApp', ['ui.router', 'BudgeOverviewController', 'BudgeBillsControllers']);

app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('overview', {
      url: '/',
      authenticate: true,
      controller: 'budgeOverviewCtrl'
    })
    .state('bills', {
      url: '/bills',
      authenticate: true,
      controller: 'billsCtrl',
      templateUrl: '/templates/bills/index.html'
    })
    .state('new-bill', {
      url: '/bills/new',
      authenticate: true,
      controller: 'newBillCtrl',
      templateUrl: '/templates/bills/new.html'
    })
    .state('edit-bill', {
      url: '/bills/edit/:id',
      authenticate: true,
      controller: 'editBillCtrl',
      templateUrl: '/templates/bills/edit.html'
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
