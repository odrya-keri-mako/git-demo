;(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', ['ui.router'])

	// Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: './html/home.html',
          controller: 'homeController'
        })
        .state('page1', {
          url: '/page1',
          templateUrl: './html/page.html',
          controller: 'pageController'
        })
        .state('page2', {
          url: '/page2',
          templateUrl: './html/page.html',
          controller: 'pageController'
        })
        .state('page3', {
          url: '/page3',
          templateUrl: './html/page.html',
          controller: 'pageController'
        });
      
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$transitions',
    '$window',
    '$state',
    '$rootScope',
    '$timeout',
    function($transitions, $window, $state, $rootScope, $timeout) {

      // Define state property
      $rootScope.state = {id:null};

      // On before transaction
      $transitions.onBefore({}, function(transition) {
        return $timeout(function() {
          if ($rootScope.state.id === null) {
            if (transition.to().name !== 'home') 
              return transition.router.stateService.target('home');
          }
          $rootScope.state.prev = $rootScope.state.id;
          $rootScope.state.id   = transition.to().name;
          return true;
        });
      });

      // On success transaction
      $transitions.onSuccess({}, function(transition) {
        return $timeout(function() {
          $window.scrollTo(0, 0);
          return true;
        });
      });

      // Get application state(s) name
      $rootScope.states = $state.get()
                                .map(state => state.name)
                                .filter(name => name !== '');
    }
  ])

	// Home controller
  .controller('homeController', [
    '$scope',
		'$timeout',
    function($scope, $timeout) {
			let pageContainer		= document.getElementById('page-container');
			$scope.currentYear	=  new Date().getFullYear().toString();
			$timeout(() => {
				pageContainer.classList.add('show');
				$timeout(() => {
					pageContainer.classList.add('loaded');
				}, 300);
			});
    }
  ])

  // Page controller
  .controller('pageController', [
    '$scope',
    function($scope) {
    }
  ]);

})(window, angular);