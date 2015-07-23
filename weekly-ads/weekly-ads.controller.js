(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['weeklyAdsFactory', 'circularFactory'];

	function weeklyAdsController(weeklyAdsFactory, circularFactory) { 
		var vm = this; // vm means viewModel
		
		vm.weeklyAdsData = undefined;
		vm.activeCircular = undefined;
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
	    	// for loop picks object out of ads data array and makes it active
	    	for (var i = 0; i < vm.weeklyAdsData.data.length; i++) {
	    		if (vm.weeklyAdsData.data[i]["actId"] === id) {
	    			vm.activeCircular = vm.weeklyAdsData.data[i]
	    		}
	    	}

	    	// then this function gets the activeCircular's page info from the circular factory
	    	getCircularData(vm.activeCircular["actId"]);
		    
		    function getCircularData(circularId) {
		    	return circularFactory.getCircularData(circularId)
		    		.then(function(data) {
		    			console.log('just before assignment');
		    			vm.circularData = data;
		    			return vm.circularData;
		    		})
		    }	    	
	    }

	    // a function to be called only by DOM click that resets the active circular
	    function removeActiveCircular() {
	    	vm.activeCircular = null;
	    }

	}
})();