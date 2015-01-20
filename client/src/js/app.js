var app = angular.module('budgeApp', ['ui.router']);

app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('overview', {
      url: '/',
      authenticate: true,
      controller: 'budgeOverviewCtrl'
    })
    .state('signin', {
      url: '/signin',
      authenticate: false,
      controller: 'budgeAuthenticationCtrl',
      templateUrl: '/templates/sessions/signin.html'
    })
    .state('signout', {
      url: '/signout',
      authenticate: false,
      controller: 'budgeSignOutCtrl'
    });

}]);
