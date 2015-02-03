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
    this.api.post($.param(bill)).then($.proxy(function(response) {
      this.bills.collection.push(response);
      this.sortBills();
    }, this));
  };

  // Get existing bill from the collection
  this.get = function(id) {
    return _.findWhere(this.bills.collection, { name: id });
  };

  // Sort bills by name
  this.sortBills = function() {
    this.bills.collection = _.sortBy(this.bills.collection, function(bill) {
      return bill.name;
    });
  };
}]);