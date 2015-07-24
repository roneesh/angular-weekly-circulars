(function() {
	angular
		.module('eCircular', ['ui.router'])
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('weekly-ads', {
				url: "/weekly-ads",
				templateUrl: "../weekly-ads/weekly-ads.html",
				controller: "weeklyAdsController",
				controllerAs: "vm"
			})
		    .state('weekly-ads.circular', {
		    	url: "/circular/:id?pgNo:int",
		    	templateUrl: "../circular/circular.html",
		    	reloadOnSearch : false //this prevents page from re-loading when query string is changed
		    })
	}
})();