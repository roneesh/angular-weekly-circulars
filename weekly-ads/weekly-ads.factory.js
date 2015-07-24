(function() {	
	'use strict';

	angular
		.module('eCircular')
		.factory('weeklyAdsFactory', weeklyAdsFactory);

	weeklyAdsFactory.$inject = ['$http'];

	function weeklyAdsFactory($http) {
		return {
			getWeeklyAdsData: getWeeklyAdsData
		};

		function getWeeklyAdsData() {
			return $http.get('/getWeeklyAds?').then(getWeeklyAdsComplete)["catch"](getWeeklyAdsFailed);

			function getWeeklyAdsComplete() {
				return response.data;
			}

			function getWeeklyAdsFailed() {
				return $http.get('weekly-ads/getWeeklyAdData.json')
			}
		}
	}
})();