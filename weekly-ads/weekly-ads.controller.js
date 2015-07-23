(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['$scope', '$log', '$stateParams', 'weeklyAdsFactory'];

	function weeklyAdsController($scope, $log, $stateParams, weeklyAdsFactory) { 
		var vm = this; // vm means viewModel
		vm.params = $stateParams
	    activate();

	    function activate() {
	  		console.log('actiavte() weekly ads');
	    	return getWeeklyAdsData();
	    }

	    function getWeeklyAdsData() {
	    	return weeklyAdsFactory.getWeeklyAdsData()
	    		.then(function(data) {
	    			vm.weeklyAdsData = data;
	    			return vm.weeklyAdsData;
	    		})
	    }
	}
})();