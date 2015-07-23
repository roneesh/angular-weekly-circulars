(function() {	
	'use strict';

	angular
		.module('eCircular')
		.factory('circularFactory', circularFactory);

	circularFactory.$inject = ['$http'];

	function circularFactory($http) {
		return {
			getCircularData: getCircularData
		};

		function getCircularData() {
			return $http.get('/getPages?')
				.then(getCircularComplete)
				.catch(getCircularFailed);

			function getCircularComplete() {
				return response.data;
			}

			function getCircularFailed() {
				// getPagesAPIData3.json has no hotspots
				// getPagesAPIData.json and Data2.json have hot spots
				var file_url = 'circular/getPagesAPIData' + '1221312' + '.json'
				return $http.get('circular/getPagesAPIData1221312.json')
			}
		}
	}
})();