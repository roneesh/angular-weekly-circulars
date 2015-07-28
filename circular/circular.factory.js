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

		function getCircularData(circularId) {
			var id = circularId;
			// defining id here to be used in getCircularCatch because for some reason promise can't accept an argument...? So using scope to have the id in that function..

			return $http.get('/getPages?').then(getCircularComplete)["catch"](getCircularFailed);

			function getCircularComplete() {
				return response.data;
			}

			function getCircularFailed() {
				var file_url = 'circular/getPagesAPIData' + id + '.json';
				return $http.get(file_url);
			}
		}
	}
})();