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

		function setActiveStore() {
			// vm.newStore should change zip, and this change in zip will re-initiate the flow via the watcher on vm.zipCode
			vm.zipCode = vm.newStore.zip
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
			var nearestStore = undefined,
				activeStore = undefined,
				activeStoreIndex = undefined,
				storeCountFromAPIResponse = vm.storesNearbyZipCode.data.length;

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

			// if there was a desired new store from the radio buttons, get it's index
			if (vm.newStore) {

				// get index of where desired store is in new data
				for (var i = 0; i < storeCountFromAPIResponse; i++) {
					if(vm.newStore.add1 === vm.storesNearbyZipCode.data[i].add1) {
						activeStoreIndex = i;
					}
				}

				// if we did find that store in data (we should), set it as active and set the three closest stores nearby
				if (activeStoreIndex) {
					activeStore = vm.storesNearbyZipCode.data[activeStoreIndex];
					vm.activeStore = activeStore;
					vm.threeClosestStores = vm.storesNearbyZipCode.data.slice(activeStoreIndex, (activeStoreIndex + 3));
				}
				else {
					nearestStore = vm.storesNearbyZipCode.data[0];
					// three nearest store assignment needs to be expanded to not just count up from array, but also check before and after
					// it's an edge case where perhaps the data for hte zip will return the desired store as index 1, 2, 3 etc and thus index 0 store might need to be on this list, not high priority...
					vm.threeClosestStores = vm.storesNearbyZipCode.data.slice(1, 4);
					return vm.activeStore = nearestStore
				}
			
			} else {
				nearestStore = vm.storesNearbyZipCode.data[0];
				vm.threeClosestStores = vm.storesNearbyZipCode.data.slice(1, 4);
				return vm.activeStore = nearestStore
			}
			
		}

	}

})();