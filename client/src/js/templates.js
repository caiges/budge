angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/nav.html","<nav class=\"uk-navbar uk-navbar-attached\">\n  <ul class=\"uk-navbar-nav\">\n    <li class=\"uk-active\"><a href=\"\">Budge</a></li>\n    <li><a href=\"\">Income</a></li>\n    <li><a ui-sref=\"bills\">Bills</a></li>\n    <li><a href=\"\">Debt</a></li>\n    <li><a href=\"\">Budgets</a></li>\n  </ul>\n</nav>");
$templateCache.put("/templates/bills/index.html","<h1>Bills</h1>\n<a ui-sref=\"new-bill\">New Bill</a>");
$templateCache.put("/templates/overview/index.html","");
$templateCache.put("/templates/sessions/new.html","<input name=\"username\" placeholder=\"Blars Tacoman\">\n<input type=\"password\" name=\"password\">\n<button>Sign In</button>\n");}]);