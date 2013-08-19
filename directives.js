/* global App */
App.directive('eatClick', function() {
	return function(scope, element) {
		$(element).click(function(event) {
			event.preventDefault();
		});
	};
});