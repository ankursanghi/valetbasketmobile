angular.module('starter.controllers', ['starter.controller_scan', 'starter.controller_list'])

.controller('loginController', function ($scope, $http, $cordovaToast, $state, Servicecall, $ionicPopup, $timeout) {

    $scope.loginData = '';
    $scope.retuneddata = '';
    $scope.wronguser = false;

    $scope.callurl = function (loginData) {


            $state.go('scan');

            //            if ((loginData.email != undefined) && (loginData.password != undefined) &&
            //                (loginData.email != "") && (loginData.password != "")) {
            //
            //                Servicecall.show();
            //                /*$timeout(function () {
            //                    Servicecall.hide();
            //                    $state.go('scan');
            //                }, 3000);*/
            //                $http({
            //                    method: 'POST',
            //                    url: 'https://localhost:8009/signin',
            //                    headers: {
            //                        'Content-Type': 'application/x-www-form-urlencoded'
            //                    },
            //                    transformRequest: function (obj) {
            //                        var str = [];
            //                        for (var p in obj)
            //                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //                        return str.join("&");
            //                    },
            //                    data: {
            //                        email: loginData.email,
            //                        password: loginData.password
            //                    }
            //                }).success(function (res) {
            //                    $scope.retuneddata = res;
            //                    window.localStorage.historyLogin = '';
            //                    window.localStorage.historyLogin = angular.toJson(res);
            //                }).then(function () {
            //
            //                    if ($scope.retuneddata.status) {
            //                        Servicecall.hide();
            //                        $state.go('scan');
            //
            //                    } else {
            //                        Servicecall.hide();
            //                        $scope.wronguser = true;
            //                        /*var alertPopup = $ionicPopup.alert({
            //                                title: 'Error',
            //                                template: 'Incorrect Username or Password'
            //                            });
            //                            alertPopup.then(function (res) {
            //                                $scope.loginData = '';
            //            
            //                            });
            //            */
            //                        //                    $cordovaToast.show('Incorrect Email or Password', 'long', 'bottom');
            //                    }
            //                })
            //
            //
            //                //        Servicecall.userlogin(loginData, function (tmpl) { //note the tmpl argument
            //                //            $scope.retuneddata = tmpl;
            //                //            console.log($scope.retuneddata);
            //                //        });
            //            } else {
            //                alert('Please enter your credentials');
            //                $cordovaToast.show('Please enter your credentials', 'long', 'bottom');
            //            }



            //////////////////////end of the function/////////////////////
        }
        /////////////////////////////forgotpassword///////////////////////////
    $scope.forgotpassword = function () {

            $state.go('forgotpassword');
        }
        /////////////////////////////forgotpassword///////////////////////////
    $scope.signup = function () {

        $state.go('signup');
    }


})

.controller('forgotpasswordController', function ($scope, $http, $state, Servicecall, $ionicPopup) {
    
    $scope.reset = '';
    $scope.back = function () {
        $state.go('app');
    }
    $scope.resetpasword = function (reset) {

        $http({
            method: 'POST',
            url: 'https://localhost:8009/mobilepasswordreset',
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
                user: reset.email
            }
        }).success(function (res) {
           console.log(res);
        })
    }
})

.controller('signupController', function ($scope, $http, $state, Servicecall, $ionicPopup) {
    $scope.existuser = false;
    $scope.newuser = false;
    $scope.signup = '';
    $scope.signupretuneddata = '';
    $scope.back = function () {
        $state.go('app');
    }

    $scope.register = function (signup) {

        if ((signup.email != undefined) && (signup.password != undefined) &&
            (signup.confirmpassword != undefined) && (signup.firstname != undefined) &&
            (signup.lastname != undefined) && (signup.gender != undefined) &&
            (signup.agree != undefined) &&
            (signup.email != "") && (signup.password != "") &&
            (signup.confirmpassword != "") && (signup.firstname != "") &&
            (signup.lastname != "") && (signup.gender != "") &&
            (signup.agree != "")) {

            Servicecall.show();
            $http({
                method: 'POST',
                url: 'https://localhost:8009/mobileRegister',
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
                    email: signup.email,
                    password: signup.password,
                    confirmpassword: signup.confirmpassword,
                    firstname: signup.firstname,
                    lastname: signup.lastname,
                    gender: signup.gender,
                    agree: signup.agree
                }
            }).success(function (res) {
                console.log(res);
                $scope.signupretuneddata = res;
            }).then(function () {

                if ($scope.signupretuneddata.status) {
                    Servicecall.hide();
                    $scope.existuser = false;
                    $scope.newuser = true;
                } else {
                    Servicecall.hide();
                    $scope.existuser = true;
                    $scope.newuser = false;
                }
            })
        } else {
            // alert('Please enter your details');
            $cordovaToast.show('Please enter your details', 'long', 'bottom');
        }
    }


});