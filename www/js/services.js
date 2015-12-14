angular.module('starter.services', [])

.factory('Servicecall', function ($http, $rootScope, $ionicLoading) {

  return {
    scannedstringall: function () {
      var scannedstring = window.localStorage.scanneddata;
      if (scannedstring) {
        return angular.fromJson(scannedstring);
      }
      return [];
    },

    productdetailsall: function () {
      var productdetails = window.localStorage.productdetails;
      if (productdetails) {
        return angular.fromJson(productdetails);
      }
      return [];
    },
    
    notindatabasedetailsall: function () {
      var notindatabasedetails = window.localStorage.notindatabasedetails;
      if (notindatabasedetails) {
        return angular.fromJson(notindatabasedetails);
      }
      return [];
    },
    
    pantrydetailsall: function () {
      var pantrydetails = window.localStorage.pantrydetails;
      if (pantrydetails) {
        return angular.fromJson(pantrydetails);
      }
      return [];
    },

    save: function (scandata) {
      window.localStorage.scanneddata = angular.toJson(scandata);
    },

    productsave: function (productdetails) {
      window.localStorage.productdetails = angular.toJson(productdetails);
    },
    
    notindatabasesave: function (notindatabasedetails) {
      window.localStorage.notindatabasedetails = angular.toJson(notindatabasedetails);
    },
    
    pantrysave: function (pantry) {
      window.localStorage.pantrydetails = angular.toJson(pantry);
    },

    show: function () {

      $ionicLoading.show({
        template: '<ion-spinner class="spinner"></ion-spinner>'
      });
    },

    hide: function () {
      $ionicLoading.hide();
    }
  };
});