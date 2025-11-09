(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var $ctrl = this;
  
  $ctrl.user = {};
  $ctrl.completed = false;
  $ctrl.invalidMenuItem = false;

  $ctrl.validateFavorite = function() {
    if ($ctrl.user.favoriteDish && $ctrl.user.favoriteDish.trim() !== '') {
      UserService.validateMenuItem($ctrl.user.favoriteDish)
        .then(function(menuItem) {
          if (menuItem === null) {
            $ctrl.invalidMenuItem = true;
            $ctrl.validMenuItem = null;
          } else {
            $ctrl.invalidMenuItem = false;
            $ctrl.validMenuItem = menuItem;
          }
        })
        .catch(function() {
          $ctrl.invalidMenuItem = true;
          $ctrl.validMenuItem = null;
        });
    }
  };

  $ctrl.submit = function() {
    UserService.validateMenuItem($ctrl.user.favoriteDish)
      .then(function(menuItem) {
        if (menuItem === null) {
          $ctrl.invalidMenuItem = true;
          return;
        }
        
        $ctrl.user.favoriteMenuItem = menuItem;
        UserService.saveUser($ctrl.user);
        $ctrl.completed = true;
        $ctrl.invalidMenuItem = false;
      })
      .catch(function() {
        $ctrl.invalidMenuItem = true;
      });
  };
}

})();