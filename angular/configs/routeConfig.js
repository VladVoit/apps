app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){
	//$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
			templateUrl: '/angular/templates/main.html',
			controller: 'MainCtrl'
	})
	.when('/about', {
			templateUrl: '/angular/templates/about.html',
			controller: 'AboutCtrl'
	})
	.when('/contact', {
			templateUrl: '/angular/templates/contact.html',
			controller: 'ContactCtrl'
	})
	.when('/search-client', {
			templateUrl: '/angular/templates/search-client.html',
			controller: 'SearchClientCtrl'
	})
	.when('/client/:clientId', {
		templateUrl: '/angular/templates/client-details.html',
		controller: 'ClientCtrl'
	})
	.when('/EditClient/:clientId', {
		templateUrl: '/angular/templates/client-edit.html',
		controller: 'ClientEditCtrl'
	})
	.otherwise({
			redirectTo: '/'
		});
	
}]);