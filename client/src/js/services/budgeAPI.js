var budgeAPI = angular.module('BudgeAPI', ['restangular', 'BudgeConfig']);

budgeAPI.factory('budgeAPI', ['Restangular', 'budgeConfig', function(Restangular, budgeConfig) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    // Configure base URL prefix for API.
    RestangularConfigurer.setBaseUrl(budgeConfig.APIHost);
    // Submit form data as a form submissions would.
    RestangularConfigurer.setDefaultHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;'
    });
  });
}]);