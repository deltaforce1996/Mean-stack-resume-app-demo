
var app = angular.module("myManage").controller("ProfileController", function ($scope, $http) {

    $scope.User = {}

    $scope.TelFomatFunc = function(){
        console.log($scope.User.UserTel);
    }

    $scope.Console = function(){
        $scope.User = {
            UserId:$scope.User.UserId,
            UserEmail:$scope.User.UserEmail,
            UserFristnane:$scope.User.UserFristnane,
            UserLastname:$scope.User.UserLastname,
            UserAge:$scope.User.UserAge,
            UserTel:$scope.User.UserTel,
            UserFacebook:$scope.User.UserFacebook,
            UserAbout:$scope.User.UserAbout,
        }
        console.log();
    }
});