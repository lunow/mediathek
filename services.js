/* global App */
App.factory('Feeds', function($store, FeedService) {
	var that = {};
	var my = {};

	my.defaults = {
		url: '',
		title: '',
		loading: true
	};

	my.feeds = $store.get('feeds') || [];

	my.drop = function(from, to) {
		var rest = my.feeds.slice((to || from) + 1 || my.feeds.length);
		my.feeds.length = from < 0 ? my.feeds.length + from : from;
		return my.feeds.push.apply(my.feeds, rest);
	};

	that.push = function(feed_url) {
		var feed;
		if(typeof feed_url == 'string') {
			feed = { url: feed_url };
		}
		else {
			feed = feed_url;
		}
		var i = my.feeds.push(angular.extend(my.defaults, feed));
		my.save();
		return my.feeds[i-1];
	};

	that.get = function() {
		return my.feeds;
	};

	that.parse = function(feed_url) {
		return FeedService.parseFeed(feed_url);
	};

	that.drop = function(index) {
		my.drop(index);
	};

	my.save = function() {
		$store.set('feeds', my.feeds);
	};

	return that;
});

App.factory('FeedService', ['$http', function($http) {
	return {
		parseFeed : function(url){
			return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
		}
	};
}]);