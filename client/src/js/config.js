var config = angular.module('BudgeConfig', []);

config.service('budgeConfig', function() {
  this.APIHost = 'http://localhost:3000';
});