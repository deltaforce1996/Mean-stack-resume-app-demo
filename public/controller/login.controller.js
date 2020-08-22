var app = angular.module("Login", []);
app.controller("LogInController", function ($scope, $http, $window) {
  // Start Varible
  $scope.Title = "Welcome";

  $scope.userName = "";
  $scope.passWord = "";
  // End Varible

  // Start Method
  $scope.LogIn = function () {
    // Notiflix.Loading.Circle('Please wait...');
    Notiflix.Loading.Hourglass("Please wait...");
    if ($scope.Validatetion($scope.userName, $scope.passWord)) {
      Notiflix.Loading.Remove(10000);
      console.log(`This is ${$scope.userName} : ${$scope.passWord}`);
    } else {
      console.log("wrong");
      Notiflix.Loading.Remove();
      Notiflix.Report.Failure(
        "Notiflix Failure",
        "Plase enter your username and password!!",
        "Click"
      );
    }
  };

  $scope.SingInGoogle = function(){
   
  }

  $scope.Validatetion = function (userName, passWord) {
    if (userName && passWord) {
      return true;
    }
    return false;
  };
  // End Method
});
