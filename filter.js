/* global App, moment */

App.filter('myDate', function() {
	return function(text) {
		var d = moment(text);
		return d.format('DD.MM.YYYY');
	};
});

App.filter('myTimeAgo', function() {
	return function(text) {
		var d = moment.duration(moment(text).valueOf() - moment().valueOf());
		return d.humanize();
	};
});