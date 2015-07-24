/* create-circular-paging.directive.js */

/**
* @desc sets up all aspects of navigating to individual pages of a circular
	@feature 1 - enables smooth scroll to page of circular via <select>
	@feature 2 - enables next/previous scrolling via buttons
	@feature 3 - appends active page to URL e.g. /weekly-ads/circular/1221312?pgNo={pgNo}
	@feature 4 - on load will scroll to page if it has a ?pgNo={pgNo} on URL
* @example <div create-circular-paging></div>
* @example <select ng-change="navigateToPage(x)"> and navigateToPage is defined here
*/

angular
    .module('eCircular')
    .directive('createCircularPaging', createCircularPaging);

createCircularPaging.$inject = ['$stateParams','$location'];

function createCircularPaging($stateParams, $location) {
    console.log('createCircularPaging directive function')

    var directive = {
        restrict: 'EA',
        link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
        
    }
}
