(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['weeklyAdsFactory', 'circularFactory', '$location'];

	function weeklyAdsController(weeklyAdsFactory, circularFactory, $stateParams) { 
		var vm = this; // vm means viewModel
		
		vm.weeklyAdsData = undefined;
		vm.activeCircular = undefined;
		vm.activePage = undefined;
		vm.setPage = setPage;
		vm.setActiveCircular = setActiveCircular;
		vm.removeActiveCircular = removeActiveCircular;
	    
	    activate();

	    function activate() {
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
		    			vm.circularData = data;
		    			return vm.circularData;
		    		})
		    }	    	
	    }

	    // a function to be called only by DOM click that resets the active circular
	    function removeActiveCircular() {
	    	vm.activeCircular = null;
	    }

	    function setPage(page) {
	    	var currentPage = $stateParams["pgNo"],
	    		destination,
	    		pageCount = vm.circularData.length;

	    	// TODO: long bit of logic to make arrows set proper page

	    	// TODO: Some code to navigate URL to new page
	    	console.log($stateParams);
	    	console.log('desitnation ?pgNo=', destination);
	    }

	}
})();