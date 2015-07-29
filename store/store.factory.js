(function() {	
	'use strict';

	angular
		.module('eCircular')
		.factory('storeFactory', storeFactory);

	storeFactory.$inject = ['$http'];

	function storeFactory($http) {
		return {
			getNearbyStoresByZipCode: getNearbyStoresByZipCode
		};

		function getNearbyStoresByZipCode(zip) {
			return $http.get('/getStoreData?').then(getNearbyStoresByZipCodeComplete)["catch"](getNearbyStoresByZipCodeFailed);

			function getNearbyStoresByZipCodeComplete() {
				return response.data;
			}

			function getNearbyStoresByZipCodeFailed() {
				return $http.get('store/getNearbyStoresByZipCodeData.json')
			}
		}

	}
})();