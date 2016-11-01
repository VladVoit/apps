app.controller('ClientCtrl', ['$scope', '$http', '$location', '$routeParams', 
	function($scope, $http, $location, $routeParams){
	
	$scope.CurrentClient = [];

	$http.get('/angular/controllers/generatedPersons.json').success(function(data) {
		angular.forEach(data, function(client, position) {
			if (client.id == $routeParams.clientId) {
				$scope.CurrentClient = client;
				console.log(client);
			};
		});
		
	});

	//Redirect to edit
	$scope.redirectToEditMode = function(client_id) {
		if(client_id) {
			$location.url("/EditClient/" + client_id);
		}
		
	}

	
	

}]);