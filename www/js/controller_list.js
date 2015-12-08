angular.module('starter.controller_list', [])

.controller('listController', function ($scope, $state, $ionicPopup, Servicecall, $http) {

 //    $scope.userdetails = angular.fromJson(window.localStorage.historyLogin);
 //    $scope.showname = $scope.userdetails.user.firstname;
 $scope.scanneddata = Servicecall.productdetailsall();
 // alert($scope.scanneddata);
 $scope.upccodes = Servicecall.scannedstringall();
 $scope.showname = "Arul";

 ///////////////////////////////////////Logout/////////////////////////////////////
 $scope.logout = function () {
  window.localStorage.historyLogin = '';
  $scope.userdetails = '';
  $scope.showname = '';
  $scope.loginData = '';
  /*window.localStorage.scanneddata = '';
  $scope.scanneddata = '';*/
  //  $state.go('app');
  $state.go('app', {});
 }

 //////////////////////////////////List displaying////////////////////////////////

 $scope.clearlist = function () {
  window.localStorage.scanneddata = '';
  window.localStorage.productdetails = '';
  $scope.scanneddata = '';
 }

 $scope.back = function () {
   //  $state.go('scan');
   $state.go('scan', {});
  }
  ///////////////////////////////actionsheet///////////////////////////////////////
 $scope.delete = function (project, upc) {
  $scope.upccodes.splice($scope.upccodes.indexOf(upc), 1);
  Servicecall.save($scope.upccodes);
  $scope.scanneddata.splice($scope.scanneddata.indexOf(project), 1);
  // Save to local storage
  Servicecall.productsave($scope.scanneddata);

 };
 /////////////////////////////////save to my pantry//////////////////////////////
 $scope.savetomypantry = function () {
  angular.forEach($scope.scanneddata, function (index) {
   $http({
    method: 'POST',
    url: 'https://localhost:8009/pantryRegister',
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: function (obj) {
     var str = [];
     for (var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
     return str.join("&");
    },
    data: {
     email: 'mohideen@kenturf.com',
     upc: index.upc,
     product_name: index.product_name,
     product_description: index.product_description,
     brand: index.brand,
     manufacturer: index.manufacturer,
     product_size: index.product_size
    }
   }).success(function (res) {
    console.log(res);
   })
  });
  $scope.upccodes = [];
  $scope.scanneddata = [];
  window.localStorage.scanneddata = [];
  window.localStorage.productdetails = [];
 }

})