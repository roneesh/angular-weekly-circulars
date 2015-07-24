(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['weeklyAdsFactory', 'circularFactory', '$location'];

	function weeklyAdsController(weeklyAdsFactory, circularFactory, $location) { 
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
	    	var cp = $location.search().pgNo, //cp means currentPage
	    		destination = page, //will come in as number from select automatically
	    		lastPage = vm.circularData.data.length;

	    	// logic to make arrows set proper page, if destination is a string
	    	if (cp === undefined || cp === null || cp === "" || cp <= 1) {
	    		cp = 1;
	    	} 
	    	else if (cp >= lastPage) {
	    		cp = lastPage
	    	}
	    	
	    	if (page === 'next') {
	    		destination = (cp >= lastPage ? lastPage : cp + 1)
	    	}

	    	if (page === 'previous') {
	    		destination = (cp <= 1 ? cp : cp - 1)
	    	}

	    	// logic to set queryString
	    	// TODO: verify this doesn't break ui-router
	    	$location.search('pgNo',destination);
	    }

	}
})();