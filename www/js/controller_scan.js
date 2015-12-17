angular.module('starter.controller_scan', [])

.controller('scanController', function ($scope, $http, $cordovaBarcodeScanner, $cordovaToast, $state, Servicecall, $timeout) {

    $scope.userdetails = angular.fromJson(window.localStorage.historyLogin);
    $scope.showname = $scope.userdetails.user.firstname;
    $scope.duplicatecheck = [];
    $scope.notindatabase = Servicecall.notindatabasedetailsall();
    $scope.allScannedlist = Servicecall.scannedstringall();
    $scope.product = Servicecall.productdetailsall();
    ///////////////////////////////////////Logout/////////////////////////////////////
    $scope.logout = function () {
        window.localStorage.historyLogin = '';
        $scope.userdetails = '';
        $scope.showname = '';
        $scope.loginData = '';
        $state.go('app', {});
    }

    //////////////////////////////////////////cordova scanner//////////////////////////////////////

    $scope.scan = function () {
        $cordovaBarcodeScanner.scan().then(function (imageData) {
                if (imageData.cancelled) {
                    $cordovaToast.show('Cancelled', 'short', 'bottom');
                } else {
                    if (imageData.text != '') {
                        var scannedtext = imageData.text;
                        $http.get('http://api.foodessentials.com/searchprods?q=' + imageData.text + '&sid=4f549b2f-4914-45e2-b7ae-7fa731883ac9&n=10&s=0&f=json&api_key=6d3pbz35ecx2jwgqr9x9hbgt').success(function (res) {
                            $scope.temtcheck1 = [];
                            $scope.temtcheck1.push(res);
                            if ($scope.temtcheck1[0].resultSize == 1) {
                                if ($scope.duplicatecheck.indexOf(imageData.text) == -1) {
                                    $scope.duplicatecheck.push(imageData.text);
                                    $scope.product.push($scope.temtcheck1[0].productsArray[0]);
                                    Servicecall.productsave($scope.product);
                                    $scope.allScannedlist.push({
                                        data: imageData.text
                                    });
                                    Servicecall.save($scope.allScannedlist);
                                    $cordovaToast.show($scope.temtcheck1[0].productsArray[0].product_name, 'short', 'bottom');
                                } else {
                                    $cordovaToast.show('Already in list', 'short', 'bottom');
                                }
                            } else {
                                $cordovaToast.show('Product description not found', 'short', 'bottom');
                                if ($scope.notindatabase.indexOf(imageData.text) == -1) {
                                    $scope.notindatabase.push(imageData.text);
                                    Servicecall.notindatabasesave($scope.notindatabase);
                                }
                            }

                        });
                    }
                }
            },
            function (error) {
                $cordovaToast.show(error, 'short', 'bottom');
            });

    }

    /////////////////////////////////go to list///////////////////////////////////

    $scope.listpage = function () {
//            $scope.testchech1 = [];
//            $scope.product = [];
//            $scope.notindatabase = [];
//            $scope.product.push({
//                numFound: 1,
//                resultSize: 1,
//                session_id: "f434d80e-801f-4cec-98b4-57af8b3fd00b",
//                productsArray: [
//                    {
//                        upc: "014800318227",
//                        isInMyList: "false",
//                        product_name: "MOTT'S JUICE BEVERAGE",
//                        product_description: "JUICE BEVERAGE",
//                        brand: "MOTT'S",
//                        manufacturer: "MOTT'S",
//                        product_size: "64 fl oz"
//                                    }
//                                    ]
//            });
//            $scope.testchech1.push($scope.product[0].productsArray[0]);
//            //$scope.testchech1.push($scope.product[1].productsArray[0]);
//            $scope.product = [];
//            Servicecall.productsave($scope.testchech1);
            //                                    $scope.notindatabase.push('036632027603');
            //                                    $scope.notindatabase.push('030800000597');
            //                                    Servicecall.notindatabasesave($scope.notindatabase);
            $state.go('list', {});
        }
        ////////////////////////////////////////storing datain array////////////////////
    angular.forEach($scope.allScannedlist, function (d) {
        console.log(d.data);
        $scope.duplicatecheck.push(d.data);
    });
    /*////////////////////////////////my pantry///////////////////////////////*/

    $scope.mypantry = function () {
            Servicecall.show();
            window.localStorage.lastview = '';
            window.localStorage.lastview = $state.current.name;
            $http({
                method: 'POST',
                url: 'https://ec2-52-33-48-38.us-west-2.compute.amazonaws.com:8009/viewPantry',
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
                    email: $scope.userdetails.user.email
                }
            }).success(function (res) {
                console.log(res);
                $scope.pantrystatus = res.status;
                $scope.pantrydata = res;

            }).then(function () {
                if ($scope.pantrystatus) {
                    Servicecall.hide();
                    Servicecall.pantrysave(null);
                    if ($scope.pantrydata.pantry.length == 0) {
                        Servicecall.pantrysave(null);
                        $state.go('pantrylist', {});
                    } else {
                        Servicecall.pantrysave($scope.pantrydata.pantry[0].productsArray);
                        $state.go('pantrylist', {});
                    }
                } else {
                    Servicecall.hide();
                    console.log("error");
                }
            });
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