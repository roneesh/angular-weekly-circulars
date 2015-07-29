(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('storeController', storeController);

	storeController.$inject = ['storeFactory', '$scope'];

	function storeController(storeFactory, $scope) { 
		var vm = this; // vm means viewModel

		// data
		vm.zipCode = zipFromCookie(); 

		// functions available in DOM
		vm.zipSubmit = zipSubmit;

		function zipFromCookie() {
			var zip = undefined;
			document.cookie.split(';').forEach(function(cookie) {
				console.log(cookie.split('='))
				if (cookie.split('=')[0] === 'zipCode') {
					zip = cookie.split('=')[1];
				} //otherwise will return undefined which is ideal
			});
			return zip;
		}

		function zipSubmit() {
			vm.zipCode = angular.copy(vm.userSuppliedZipCode);
			getNearbyStoresByZipCode(vm.zipCode);
		}		

		function getNearbyStoresByZipCode(zip) {
			return storeFactory.getNearbyStoresByZipCode(zip)
				.then(function(data) {
	    			vm.storesByZipCode = data;
	    			return vm.storesByZipCode;
	    		})
		}

		// WATCHERS

		$scope.$watch('vm.zipCode', function(newValue, oldValue) {
			if (vm.zipCode) {
				getNearbyStoresByZipCode(vm.zipCode)
			}
		});
	
	}

})();