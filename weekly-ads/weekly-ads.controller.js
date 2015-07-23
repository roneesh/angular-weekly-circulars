(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['$scope', '$log', '$stateParams', 'weeklyAdsFactory'];

	function weeklyAdsController($scope, $log, $stateParams, weeklyAdsFactory) { 
		var vm = this; // vm means viewModel
		vm.params = $stateParams
		vm.setActiveCircular = setActiveCircular;
		vm.removeActiveCircular = removeActiveCircular;
	    
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

	    function setActiveCircular(id) {
	    	for (var i = 0; i < vm.weeklyAdsData.data.length; i++) {
	    		if (vm.weeklyAdsData.data[i]["actId"] === id) {
	    			vm.activeCircular = vm.weeklyAdsData.data[i]
	    		}
	    	}
	    	console.log('active circular: ' + vm.activeCircular)
	    }

	    function removeActiveCircular() {
	    	vm.activeCircular = null;
	    }

	}
})();