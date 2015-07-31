(function() {
	angular
		.module('eCircular', ['ui.router'])
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('store', {
				url: '/',
				templateUrl: '../store/store.html',
				controller: 'storeController',
				controllerAs: 'vm'
			})
			.state('store.weekly-ads', {
				url: ":store/weekly-ads",
				templateUrl: "../weekly-ads/weekly-ads.html",
				controller: "weeklyAdsController",
				controllerAs: "vm"
			})
		    .state('store.weekly-ads.circular', {
		    	url: "/circular/:id?pgNo:int",
		    	templateUrl: "../circular/circular.html",
				controller: "weeklyAdsController",
				controllerAs: "vm",
		    	reloadOnSearch : false, //this prevents page from re-loading when query string is changed
		    })
	}
})();