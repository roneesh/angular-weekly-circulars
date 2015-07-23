(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('weeklyAdsController', weeklyAdsController);

	weeklyAdsController.$inject = ['$scope', '$log', '$stateParams', 'weeklyAdsFactory', 'circularFactory'];

	function weeklyAdsController($scope, $log, $stateParams, weeklyAdsFactory, circularFactory) { 
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

	    	// then this function gets the activeCircular's page info
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

	    function removeActiveCircular() {
	    	vm.activeCircular = null;
	    }

	}
})();