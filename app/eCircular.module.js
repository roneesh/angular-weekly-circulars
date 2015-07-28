(function() {
	angular
		.module('eCircular', ['ui.router'])
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('zip-code', {
				url: ':zip',
				templateUrl: '../zip-code/zip-code.html',
				controller: 'zipCodeController',
				controllerAs: 'vm'
			})
			.state('zip-code.weekly-ads', {
				url: "/weekly-ads",
				templateUrl: "../weekly-ads/weekly-ads.html",
				controller: "weeklyAdsController",
				controllerAs: "vm"
			})
		    .state('zip-code.weekly-ads.circular', {
		    	url: "/circular/:id?pgNo:int",
		    	templateUrl: "../circular/circular.html",
				controller: "weeklyAdsController",
				controllerAs: "vm",
		    	reloadOnSearch : false, //this prevents page from re-loading when query string is changed
		    })
	}
})();