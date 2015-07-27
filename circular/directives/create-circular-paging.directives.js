/* create-circular-paging.directive.js */

/**
* @desc sets up all aspects of navigating to individual pages of a circular
	@feature 1 - enables smooth scroll to page of circular via <select>
	@feature 2 - enables next/previous scrolling via buttons
	@feature 3 - appends active page to URL e.g. /weekly-ads/circular/1221312?pgNo={pgNo}
	@feature 4 - on load detects pgNo in querty string
    @feature 5 - will scroll to pgNo if it is detected
* @example <div create-circular-paging></div>
* @example <select ng-change="navigateToPage(x)"> and navigateToPage is defined here
*/

angular
    .module('eCircular')
    .directive('createCircularPaging', createCircularPaging);

createCircularPaging.$inject = [];

function createCircularPaging() {

    var directive = {
        restrict: 'EA',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

        // setting up the watcher to scroll to a page
        scope.$watch(getActivePage, scrollToPage );

        function getActivePage() {
            return scope.vm.activePage;
        }

        function scrollToPage(newValue, oldValue) {

            console.log(newValue, oldValue);

            // iterate through children, find which div class a class of form 'circular-page 1' and then split to get '1' alone, then set the scrollLeft of the parent el[0] to the child's offsetLeft
            for (var i = 0; i < el[0].children.length; i++) {
                
                var classIndex = el[0].children[i].getAttribute('class').split(' ')[1];
                
                if (classIndex === newValue.toString() ) {
                    el[0].scrollLeft = angular.element(el[0].children[i])[0].offsetLeft;
                }
            }
            return false; 
        }

    }
}
