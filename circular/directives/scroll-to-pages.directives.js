/* scroll-to-pages.directive.js */

/**
* @desc sets up all aspects of navigating to individual pages of a circular
	@feature 1 - scrolls smoothly to page if pgNo in controller is changed
	@feature 4 - on load scrolls to page in pgNo variable in controller
* @example <div create-circular-paging></div>
*/

angular
    .module('eCircular')
    .directive('scrollToPages', scrollToPages);

function scrollToPages() {

    var directive = {
        restrict: 'EA',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
        
    }
}
