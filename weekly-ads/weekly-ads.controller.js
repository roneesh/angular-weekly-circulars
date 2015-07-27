(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['weeklyAdsFactory', 'circularFactory', '$location', '$scope'];

	function weeklyAdsController(weeklyAdsFactory, circularFactory, $location, $scope) { 
		var vm = this; // vm means viewModel
		
		// data
		vm.weeklyAdsData = undefined; //list of circulars
		vm.activeCircular = undefined; // the circular being displayed
		vm.circularData = undefined; //the page data of the circulars
		vm.circularPageCount = undefined // the numerical page count of the active circular
		vm.activePage = $location.search().pgNo; //the page the user wants scrolled to

		// functions
		vm.setActiveCircular = setActiveCircular;
		vm.removeActiveCircular = removeActiveCircular;
		vm.previousPage = previousPage;
		vm.nextPage = nextPage;
	    
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
	    			vm.activePage = 1; //need to reset activePage

	    		}
	    	}

	    	// then this function gets the activeCircular's page info from the circular factory
	    	getCircularData(vm.activeCircular["actId"]);
		    
		    function getCircularData(circularId) {
		    	return circularFactory.getCircularData(circularId)
		    		.then(function(data) {
		    			vm.circularData = data;
		    			vm.circularPageCount = vm.circularData.data.length;
		    			return vm.circularData;
		    		})
		    }	    	
	    }

	    // a function to be called only by DOM click that resets the active circular
	    function removeActiveCircular() {
	    	vm.activeCircular = null;
	    }

	    function nextPage() {
	    	vm.activePage = (vm.activePage >= vm.circularPageCount ? vm.circularPageCount : vm.activePage + 1)
	    }

	    function previousPage() {
	    	vm.activePage = (vm.activePage <= 1 ? 1 : vm.activePage - 1)
	    }

	    // make into a directive of some kind
	    $scope.$watch('vm.activePage', function(newValue, oldValue) {
	    	$location.search('pgNo', newValue);
	    })

	}
})();