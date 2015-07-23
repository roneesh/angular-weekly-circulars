(function() {
	'use strict';

	angular
		.module('eCircular')
		.controller('circularController', circularController);

	circularController.$inject = ['$scope', '$log', '$stateParams', 'circularFactory'];

	function circularController($scope, $log, $stateParams, circularFactory) { 
		var vm = this; // vm means viewModel

	    activate();

	    function activate() {
	  		console.log('actiavte() circular controller');
	    	return getCircularData($stateParams.id);
	    }
	    
	    function getCircularData() {
	    	return circularFactory.getCircularData()
	    		.then(function(data) {
	    			console.log('just before assignment');
	    			vm.circularData = data;
	    			return vm.circularData;
	    		})
	    }
	}
})();