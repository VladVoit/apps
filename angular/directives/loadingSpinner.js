app.directive('loadingSpinner', ['$http', function($http){
	return {
		restrict: 'A',
		link: function(scope, el, attrs) {

			scope.isLoading = function(){
				return $http.pendingRequests.length > 0 || $http.showLoading;
			};

			scope.$watch(scope.isLoading, function(isLoading) {
				if(isLoading) {
					el.show();
				} else {
					el.hide();
				}
			});
		}
	}
}])