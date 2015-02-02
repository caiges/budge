var billServices = angular.module('BudgeBillServices', []);

billServices.service('billService', function() {
  this.bills = {
    collection: []
  };

  // Fetch bills
  this.fetch = function(force) {
    if(this.bills.collection.length === 0 || force) {
      console.log('fetching bills');
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

  // Get existing bill from the collection
  this.get = function(id) {
    return _.findWhere(this.bills.collection, { name: id });
  };
});