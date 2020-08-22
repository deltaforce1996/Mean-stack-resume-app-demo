var app = angular.module("myManage", ["ngRoute","ui.bootstrap"]);

app
  .config(function ($routeProvider) {
    $routeProvider
      .when("/dashboard", {
        templateUrl: "dashboard",
        controller: "DashBoardController"
      })
      .when("/contents", {
        templateUrl: "contents",
        controller: "ContentsController"
      })
      .when("/profile",{
        templateUrl: "profile",
        controller: "ProfileController"
      })
      .otherwise({
        redirectTo: "/dashboard"
      });
  })


  .controller("ManageController", function ($scope) {
    //    Start Varible Of Manage Controller.
    $scope.menuItems = [
      {
        id: "01",
        title: "Dashboard",
        icon: "dashboard",
        link: "#!dashboard"
      },
      {
        id: "02",
        title: "Update",
        icon: "perm_contact_calendar",
        link: "#!contents"
      },
      {
        id: "03",
        title: "Profile",
        icon: "person",
        link: "#!profile"
      }
    ];

    $scope.title = "Project";
    $scope.IsOpened = false;
    $scope.states = {};
    $scope.states.activeItem = "01";
    $scope.dropdown = "";

    //    End Varible Of Manage Controller.

    //  Start Method
    $scope.init = function () {
     $scope.titleContent = "Dashboard";
    //  console.log("init");
    };

    $scope.init();

    $scope.OpenedRightDrop=function(){
      $scope.isvisibilityRihgtdop = !$scope.isvisibilityRihgtdop;
      if($scope.isvisibilityRihgtdop){
        $scope.dropdown = "show";
      }else{
        $scope.dropdown = "";
      }
      console.log($scope.isvisibilityRihgtdop);
    };

    $scope.Opened = () => {
      if (!$scope.IsOpened) {
        $scope.IsOpened = true;
        var myEl = angular.element(
          document.querySelector(".navbar-toggler")
        );
        myEl.addClass("toggled");
        console.log("True");
      } else {
        $scope.IsOpened = false;
        var myEl = angular.element(
          document.querySelector(".navbar-toggler")
        );
        myEl.removeClass("toggled");
        console.log("False");
      }
    };

    $scope.Actived = value => {
      $scope.titleContent = value.title;
      $scope.states.activeItem = value.id;
    };
   
    //  End Method
  });
