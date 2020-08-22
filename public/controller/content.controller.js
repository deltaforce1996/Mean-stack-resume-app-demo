var app = angular
  .module("myManage")
  .controller("ContentsController", function($scope, $uibModal) {

    $scope.init = function() {
      Notiflix.Loading.Hourglass('Please wait...');
      Notiflix.Loading.Remove(3000);
    };
    
    // $scope.init();

    //    Start Varible Of Contents Controller.
    $scope.itemsDetails = [
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 01",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 02",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 03",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 04",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 05",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 06",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 07",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 08",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      },
      {
        Id: "P201904121545251",
        Date: "2020-03-23",
        Title: "Monitoring Pateint Of Alzimer 09",
        Disciption: "Appication for tracking patints of Alzimer",
        Url: "URL of files"
      }
    ];

    $scope.cardItems = [
      {
        title: "Oop-Space",
        Value: 62,
        Unit:"GB",
        Icon:"markunread_mailbox"
      }, {
        title: "Oop-Between",
        Value: 62,
        Unit:"KB",
        Icon:"perm_contact_calendar"
      }, {
        title: "Oop-ShutDawn",
        Value: 62,
        Unit:"OB",
        Icon:"art_track"
      }
    ];

    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;

    $scope.$watch("currentPage + numPerPage", function() {
      var begin = ($scope.currentPage - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;

      $scope.filteredTodos = $scope.itemsDetails.slice(begin, end);
    });

    $scope.title = "Contents Controller";
    //    End Varible Of Contents Controller.

    //  Start Method
    $scope.ConfirmedDel = value => {
      console.log("Open ConfirmedDel !");

      var mq = window.matchMedia("(max-width: 570px)");
      if (mq.matches) {
        Notiflix.Notify.Init({ position: "left-bottom" });
      } else {
        Notiflix.Notify.Init({ position: "right-bottom" });
      }

      Notiflix.Confirm.Show(
        "Notiflix Delete",
        "Do you want del " + value,
        "Yes",
        "No",
        function() {
          // Yes button callback
          Notiflix.Notify.Success("Sol lucet omnibus");
        },
        function() {
          // No button callback
          Notiflix.Notify.Failure("Qui timide rogat docet negare");
        }
      );
    };

    $scope.OpenModalEdit = function(value) {
      // console.log("Open Modal !  " + value.Id);
      var modalInstance = $uibModal.open({
        templateUrl: "modal-new-project-content",
        controller: "modal-new-project-controller",
        size: "",
        position: "center",
        // Interesting stuff here.
        resolve: {
          param: value
        }
      });

      modalInstance.result.then(function(response) {
        $scope.result = `${response} button hitted`;
      });
    };
    //  End Method
  });
