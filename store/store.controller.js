(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('storeController', storeController);

	storeController.$inject = ['storeFactory', '$scope'];

	function storeController(storeFactory, $scope) { 
		var vm = this; // vm means viewModel

		// data
		vm.zipCode = zipFromCookie();  //zipcode user is search nearby
		vm.storesNearbyZipCode = undefined; //JSON of stores near the zipcode
		vm.activeStore = undefined //stores whose circular we get
		vm.threeClosestStores = undefined //three nearest stores from activeStore

		// functions available in DOM
		vm.zipSubmit = zipSubmit;
		vm.setActiveStore = setActiveStore

		function zipSubmit() {
			vm.zipCode = angular.copy(vm.userSuppliedZipCode);
			getNearbyStoresByZipCode(vm.zipCode);
			vm.userSuppliedZipCode = undefined;
		}	

		function setActiveStore(store) {

			// this function should really go through the whole flow again, but save the store that the new user wants..

			// the store should change the zip, because the user's store is pretty far elsewhere... but will verify first.

			vm.activeStore = vm.newStore;
			vm.newStore = undefined;

			// get the three nearest stores to the new store

		}

		// watchers
		$scope.$watch('vm.zipCode', function(newValue, oldValue) {
			if (vm.zipCode) {
				getNearbyStoresByZipCode(parseInt(vm.zipCode,10));
			}
		});

		// private functions
		function zipFromCookie() {
			var zip = undefined;
			document.cookie.split(';').forEach(function(cookie) {
				if (cookie.split('=')[0] === 'zipCode') {
					zip = cookie.split('=')[1];
				} //otherwise will return undefined which is ideal
			});
			return zip;
		}

		function getNearbyStoresByZipCode(zip) {
			return storeFactory.getNearbyStoresByZipCode(zip)
				.then(function(data) {
	    			vm.storesNearbyZipCode = data;
	    			return vm.storesNearbyZipCode;
	    		})
	    		.then(function() {
	    			setNearestStoreAsActiveStore();
	    		})
		}

		function setNearestStoreAsActiveStore() {
			var nearestStore = vm.storesNearbyZipCode.data[0];
			// use .sort() with a comparator function
			vm.storesNearbyZipCode.data.sort(function(a,b) {
				if (a.distance < b.distance) {
					return -1;
				}
				if (a.distance > b.distance) {
					return 1;
				}
				// a must be equal to b
				return 0;
			});
			// sets three closest stores as indices 1,2,3 of sorted data array
			vm.threeClosestStores = vm.storesNearbyZipCode.data.slice(1, 4);
			//is an object {}
			return vm.activeStore = vm.storesNearbyZipCode.data[0]; 
		}

	}

})();