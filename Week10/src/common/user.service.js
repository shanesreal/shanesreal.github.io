(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  var userInfo = null;

  service.saveUser = function(user) {
    userInfo = user;
  };

  service.getUser = function() {
    return userInfo;
  };

  service.isSignedUp = function() {
    return userInfo !== null;
  };

  service.validateMenuItem = function(shortName) {
    if (!shortName || shortName.trim() === '') {
      return $http.reject('Empty menu item');
    }

    var category = shortName.charAt(0).toUpperCase();
    var itemNumber = parseInt(shortName.substring(1)) - 1;

    if (isNaN(itemNumber) || itemNumber < 0) {
      return $http.reject('Invalid menu item format');
    }

    return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + itemNumber + '.json')
      .then(function(response) {
        return response.data;
      });
  };
}

})();