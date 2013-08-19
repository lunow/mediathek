/* global App */
/*App.value('Feeds', [
	{
		title: 'Anne Will',
		url: 'http://mediathek.daserste.de/export/rss?sendung=328454',
		loading: true,
		items: []
	},
	{
		title: 'Bambule',
		url: 'http://www.zdf.de/ZDFmediathek/rss/1563028?view=rss',
		loading: true,
		items: []
	},
	{
		title: 'Abendschau',
		url: 'http://www.rbb-online.de/abendschau/index.xml/feed=rss.xml',
		loading: true,
		items: []
	},
	{
		title: 'Precht',
		url: 'http://www.zdf.de/ZDFmediathek/rss/1704486?view=rss',
		loading: true,
		items: []
	},
	{
		title: 'Bauernfeind',
		url: 'http://www.zdf.de/ZDFmediathek/rss/1323446?view=rss',
		loading: true,
		items: []
	},
	{
		title: 'Elektrischer Reporter',
		url: 'http://www.zdf.de/ZDFmediathek/rss/640618?view=rss',
		loading: true,
		items: []
	},
	{
		title: 'Beckmann',
		url: 'http://mediathek.daserste.de/export/rss?sendung=443668',
		loading: true,
		items: []
	},
	{
		title: 'Maischberger',
		url: 'http://mediathek.daserste.de/export/rss?sendung=311210',
		loading: true,
		items: []
	},
	{
		title: 'Hart aber fair',
		url: 'http://podcast.wdr.de/hartaberfair.xml'
	},
	{
		title: 'Maybrit Illner',
		url: 'http://www.zdf.de/ZDFmediathek/rss/414?view=rss'
	},
	{
		title: 'Krömer',
		url: 'http://mediathek.daserste.de/export/rss?sendung=11424988'
	}
]);*/

App.controller('ctrl', function($scope, Feeds) {
	$scope.add_modal = false;

	$scope.add = function() {
		$('.modal').modal();
	};

	$scope.save = function() {
		var feed = Feeds.push({url: $scope.feed, title: $scope.title });
		Feeds.parse($scope.feed).then(function(res) {
			feed.loading = false;
			feed.items = res.data.responseData.feed.entries;
		});
		$scope.feed = '';
		$scope.title = '';
		$('.modal').modal('hide');
	};

	$scope.drop = function(i) {
		Feeds.drop(i);
	};
});

App.controller('index', function($scope, Feeds, $store) {

	$scope.feeds = Feeds.get();
	console.log($scope.feeds);

	angular.forEach($scope.feeds, function(feed) {
		Feeds.parse(feed.url).then(function(res) {
			feed.loading = false;
			feed.items = res.data.responseData.feed.entries;
		});
	});

	$scope.hide = function() {
		var hidden = $store.get('hidden') || [];
		hidden.push(this.item.link);
		$store.set('hidden', hidden);
	};

	$scope.hidden = function(item) {
		item.hidden = $.inArray(item.link, $store.get('hidden')) > -1;
		return true;
	};
});