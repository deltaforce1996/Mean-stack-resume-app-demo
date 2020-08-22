var app = angular.module('myApp', []);

app.controller('IndexController',  function ($scope) {
	$scope.myTitle = "";
	$scope.myCareer = "";
	$scope.myCounty = "";

	$scope.ShowAlertify = () => {
		Notiflix.Notify.Success('Sol lucet omnibus');
	};
});
