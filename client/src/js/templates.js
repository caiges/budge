angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/nav.html","<nav class=\"uk-navbar uk-navbar-attached\">\n  <ul class=\"uk-navbar-nav\">\n    <li><a href=\"\">Budge</a></li>\n    <li><a href=\"\">Income</a></li>\n    <li><a ui-sref=\"bills\">Bills</a></li>\n    <li><a href=\"\">Debt</a></li>\n    <li><a href=\"\">Budgets</a></li>\n  </ul>\n</nav>");
$templateCache.put("/templates/bills/index.html","<h1>Bills</h1>\n<a ui-sref=\"new-bill\" class=\"uk-button\">New Bill</a>");
$templateCache.put("/templates/bills/new.html","<h1>New Bill</h1>\n\n<form name=\"newBillForm\" class=\"uk-form\" novalidate>\n  <div class=\"uk-form-row\">\n    <input type=\"text\" name=\"name\" ng-model=\"newBill.name\" placeholder=\"Car Insurance\" required>\n  </div>\n  <div class=\"uk-form-row\">\n    <input type=\"number\" name=\"amount\" ng-model=\"newBill.amount\" placeholder=\"120.00\" required>\n  </div>\n  <div class=\"uk-form-row\">\n    <button class=\"uk-button uk-button-primary\" ng-click=\"save(newBillForm)\" ng-disabled=\"newBillForm.$invalid\">Save</button>\n  </div>\n</form>");
$templateCache.put("/templates/overview/index.html","");
$templateCache.put("/templates/sessions/new.html","<input name=\"username\" placeholder=\"Blars Tacoman\">\n<input type=\"password\" name=\"password\">\n<button>Sign In</button>\n");}]);