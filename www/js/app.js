// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'ngCordova'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: '/app',
      //      abstract: true,
      templateUrl: 'templates/login.html',
      controller: 'loginController',
      cache: false
    })
    .state('scan', {
      url: '/scan',
      templateUrl: 'templates/scan.html',
      controller: 'scanController',
      cache: false
    }).state('list', {
      url: '/list',
      templateUrl: 'templates/list.html',
      controller: 'listController',
      cache: false
    }).state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'templates/forgotpassword.html',
      controller: 'forgotpasswordController',
      cache: false
    }).state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupController',
      cache: false
    }).state('pantrylist', {
      url: '/pantrylist',
      templateUrl: 'templates/pantrylist.html',
      controller: 'pantrylistController',
      cache: false
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});