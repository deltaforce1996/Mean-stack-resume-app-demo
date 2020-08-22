var app = angular
  .module("myManage")
  .controller("modal-new-project-controller", function($scope, $uibModalInstance, param) {
    $scope.data = param;
    // console.log("Parameter => " + $scope.data.Id);

    $scope.ok = function() {
      $uibModalInstance.close("Ok");
    };

    $scope.init = function() {
      $scope.currentStep = 1;
    };

    $scope.init();

    $scope.cancel = function() {
      // $uibModalInstance.dismiss();
      $uibModalInstance.close("dismiss");
    };

    // Navigation functions
    $scope.stepForward = function() {
      $scope.currentStep += 1;
      var myEl = angular.element(document.querySelector(".au"));
      myEl.addClass("active");
    };

    $scope.stepBack = function() {
      $scope.currentStep -= 1;
      var myEl = angular.element(document.querySelector(".au"));
      myEl.removeClass("active");
    };

    $scope.showStep = function(step) {
      console.log(step);
      return step == $scope.currentStep;
    };

    $scope.Confirmed = value => {

      var mq = window.matchMedia("(max-width: 570px)");
      if (mq.matches) {
        Notiflix.Notify.Init({ position: "left-bottom" });
      } else {
        Notiflix.Notify.Init({ position: "right-bottom" });
      }

      Notiflix.Confirm.Show(
        "Notiflix Update",
        "Do you want edit " + value,
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

  });
