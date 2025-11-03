(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.found = [];
    ctrl.searched = false;

    ctrl.narrowItDown = function () {
      ctrl.searched = true;

      if (ctrl.searchTerm === "") {
        ctrl.found = [];
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

      promise.then(function (foundItems) {
        ctrl.found = foundItems;
      });
    };

    ctrl.removeItem = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
      }).then(function (result) {
        var foundItems = [];
        
        for (var categoryKey in result.data) {
          var category = result.data[categoryKey];
          var menuItems = category.menu_items;
          
          for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems[i];
            if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(item);
            }
          }
        }

        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'founditems.template.html',
      scope: {
        items: '<',
        onRemove: '&',
        searched: '<'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function () {
      return list.items === undefined || list.items.length === 0;
    };
  }

})();