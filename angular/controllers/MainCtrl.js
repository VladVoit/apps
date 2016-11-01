
//Main Controller
app.controller('MainCtrl', ['$scope', '$rootScope', '$log', '$location', 'ClientsFactory', '$alert',
	function($scope, $rootScope, $log, $location, ClientsFactory, $alert){

	$scope.pageHeader = 'Clients';
	$rootScope.currentPage = "home";
	$scope.myName = "Vladyslav Voit";
	//	$scope.People = ClientsFactory.getPeople();
	
	ClientsFactory.getAllClients().then(function(data){
		$scope.People = data;
	});





	// $scope.$watch('textarea', function(newVal, oldVal){
	// 	$log.log("Value changed!");
	// 	$log.info(oldVal);
	// 	$log.info(newVal);
	// });

	//Action link
	$scope.goOnClient = function(person) {
		if (person.id && person.active) {
			$location.url('client/' + person.id);
		} else {
			$scope.showAlert(person.name);
		}
	}

	//Alert

	$scope.showAlert = function(personeName){
		var WarningAlert = $alert({
			title: 'Warning! ', 
			content: "Customer " + personeName + " blocked by administrator", 
			placement: 'top-right',
			duration: "3", 
			type: 'danger', 
			show: true
		});
		WarningAlert.$promise.then(function(){
			WarningAlert.show();
		});
	};

	//tooltip
	$scope.tooltip = {
		title: "Click to see full info about customer",
		type: "info",
		container: "body"
	}
	

	//Search actions
	$scope.sortParam = 'name';
	$scope.insertSortType = function(sortKey) {
		$scope.sortParam = sortKey;
		$scope.reverse = !$scope.reverse;
	}


	//Pggination
	$scope.currentPage = 1;
	$scope.itemsOnPage = 25;



}]);















