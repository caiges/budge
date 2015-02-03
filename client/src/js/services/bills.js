var billServices = angular.module('BudgeBillServices', ['BudgeAPI']);

billServices.service('billService', ['budgeAPI', function(budgeAPI) {
  this.api = budgeAPI.service('bills');
  this.bills = {
    collection: []
  };

  // Fetch bills
  this.fetch = function(force) {
    if(this.bills.collection.length === 0 || force) {
      this.bills.collection = this.api.getList().$object;
    }
  };

  // Save new bill to the collection
  this.save = function(bill) {
    this.bills.collection.push(bill);
  };

  // Update existing bill in the collection
  this.update = function(bill) {
    var existingBill = this.get(bill);
    existingBill = _.extend(existingBill, bill);
  };

  // Create new bill
  this.create = function(bill) {
    this.api.post($.param(bill)).then(function(response) {
      console.log(response);
    });
  };

  // Get existing bill from the collection
  this.get = function(id) {
    return _.findWhere(this.bills.collection, { name: id });
  };
}]);