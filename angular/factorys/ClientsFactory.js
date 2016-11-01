app.factory('ClientsFactory', function ($http, $q, $routeParams) {
	var People = [];
	//Get all
	var Client = {};
	return {
		getAllClients: function() {
			var deferred = $q.defer();
			$http.get('/angular/controllers/generatedPersons.json')
			.success(function(data){
				People = data;
				deferred.resolve(data);
				
			});
			return deferred.promise;
		},
		getClientById: function(id) {
			if(id) {
				var deferred = $q.defer();
				$http.get('/angular/controllers/generatedPersons.json')
					.success(function(data){
						angular.forEach(data, function(client, key) {
							if(client.id == id) {
								Client = client;
								deferred.resolve(Client);
							}
						});
						
						
						
				});
				return deferred.promise;
			}
		},
		getCurrentClientId: function(){
			return $routeParams.clientId;
		}
	}

});