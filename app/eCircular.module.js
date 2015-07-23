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
		    	url: "/circular/:id",
		    	templateUrl: "../circular/circular.html",
		    	controller: "circularController",
		    	controllerAs: "vm"
		    })
	}
})();