angular.module('starter.controller_scan', [])

.controller('scanController', function ($scope, $http, $state, $ionicPopup, Servicecall, $cordovaToast, $timeout) {

    //    $scope.userdetails = angular.fromJson(window.localStorage.historyLogin);
    //    window.localStorage.resultArrayStorage = '';
    //    $scope.showname = $scope.userdetails.user.firstname;
    //    window.localStorage.scanneddata = '';
    $scope.testarray = [];
    $scope.tempscan = [];
    $scope.templist = [];
    $scope.allScannedlist = Servicecall.scannedstringall();
    $scope.product = Servicecall.productdetailsall();
    $scope.showname = "Arul";
    $scope.togglestatus = true;
    ///////////////////////////////////////Logout/////////////////////////////////////
    $scope.logout = function () {
            window.localStorage.historyLogin = '';
            $scope.userdetails = '';
            $scope.showname = '';
            $scope.loginData = '';
            /* window.localStorage.scanneddata = '';
             $scope.scanneddata = '';*/
            // $state.go('app');
            $state.go('app', {});
        }
        /////////////////////////////////////scanning/////////////////////////////////////

    function onBodyLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    function success(resultArray) {

        $http.get('http://api.foodessentials.com/searchprods?q=' + resultArray[0] + '&sid=4f549b2f-4914-45e2-b7ae-7fa731883ac9&n=10&s=0&f=json&api_key=6d3pbz35ecx2jwgqr9x9hbgt').success(function (res) {
            //               alert(res);
            $scope.temtcheck1 = [];
            $scope.temtcheck1.push(res);
            if ($scope.temtcheck1[0].resultSize == 1) {
                if ($scope.testarray.indexOf(resultArray[0]) == -1) {
                    $scope.testarray.push(resultArray[0]);
                    $scope.product.push($scope.temtcheck1[0].productsArray[0]);
                    Servicecall.productsave($scope.product);
                    $scope.allScannedlist.push({
                        data: resultArray[0],
                        type: resultArray[1]
                    });
                    Servicecall.save($scope.allScannedlist);
                }
            } else {
                alert('empty');
            }

        });

    }

    function failure(error) {

        $cordovaToast.show('Cancelled', 'short', 'bottom');
    }

    $scope.scan = function () {

            // See below for all available options.
            cordova.exec(null, null, "ScanditSDK", "torch", [true]);
            cordova.exec(success, failure, "ScanditSDK", "scan", ["oIDzpEIx4DYfrRgpA5WVY5/lr6m5oaUmcEFVRXXJl+s",
                {
                    "beep": true,
                    "code128": false,
                    "dataMatrix": false,
                    "continuousMode": true
      }]);

        }
        /////////////////////////////////go to list///////////////////////////////////

    $scope.listpage = function () {
            $scope.testchech1 = [];
            $scope.product = [];
            $scope.product.push({
                numFound: 1,
                resultSize: 1,
                session_id: "f434d80e-801f-4cec-98b4-57af8b3fd00b",
                productsArray: [
                    {
                        upc: "014800318227",
                        isInMyList: "false",
                        product_name: "MOTT'S JUICE BEVERAGE",
                        product_description: "JUICE BEVERAGE",
                        brand: "MOTT'S",
                        manufacturer: "MOTT'S",
                        product_size: "64 fl oz"
            }
            ]
            });
            for (var i = 0; i <= 2; i++) {
                $scope.testchech1.push($scope.product[0].productsArray[0]);
            }
            $scope.product = [];
            Servicecall.productsave($scope.testchech1);
            $state.go('list', {});
        }
        ////////////////////////////////////////storing datain array////////////////////
    angular.forEach($scope.allScannedlist, function (d) {
        console.log(d.data);
        $scope.testarray.push(d.data);
    });
    /////////////////////////////////////////status////////////////////////////////
    $scope.checkstatus = function () {

            $scope.togglestatus = !$scope.togglestatus;
            console.log($scope.togglestatus);
        }
        ////////////////////////////////tempcheck//////////////////////////////////////

    /* $scope.allScannedlist.push({
         data: '014800318227',
         type: '',
     }, {
         data: '030800000597',
         type: '',
     });
     Servicecall.save($scope.allScannedlist);*/

})