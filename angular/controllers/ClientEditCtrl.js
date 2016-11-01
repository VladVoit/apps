app.controller('ClientEditCtrl', ['$scope', '$modal', '$location', '$routeParams', 'ClientsFactory', '$log',
	function($scope, $modal, $location, $routeParams, ClientsFactory, $log){

	 	$scope.clientId = ClientsFactory.getCurrentClientId();

		ClientsFactory.getClientById($scope.clientId).then(function(data){
			$scope.client = data;
		});


		$scope.cancelEditModal = $modal({
			title: 'Cancel Edit', 
			content: 'Do you realy want cancel edit?',
			controller: 'ClientEditCtrl',
			templateUrl: '/angular/templates/modals/cancelEdit.tpl.html', 
			show: false,
			hide: false
		});

		$scope.showModal = function() {
		    $scope.cancelEditModal.$promise.then($scope.cancelEditModal.show);
		};

		$scope.cancelEdit = function(){
			$scope.showModal();
		}

		$scope.redirectToView = function() {
			if($scope.clientId) {
				$scope.cancelEditModal.$promise.then($scope.cancelEditModal.hide);
				$location.url("/client/" + $scope.clientId);
			}
		}

}]);