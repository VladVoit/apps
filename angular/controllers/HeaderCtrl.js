app.controller('HeaderCtrl', ['$scope', '$rootScope', '$log', 
	function ($scope, $rootScope, $log) {
	
	$scope.greetingModal = {
  		"title": "Hello!",
  		"content": "This is my first Angular project. Press 'x' to continue. (^.^)"
	};

}]);