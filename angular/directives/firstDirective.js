app.directive('myDirective', [function () {
	return {
		restrict: 'E',
		replace: true,
		scope: { 
			// @ - text
			//directiveText: "@",
			// = - two way binding
			myInfoObj: "=",
			// & - function
			formattedFunc: "&"
		},
		templateUrl: "/angular/directives/firstDirective.html"
	};
}])