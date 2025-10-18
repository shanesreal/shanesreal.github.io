(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('angularDollar', AngularDollarFilter); // applying filter adds 3 $ signs

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    
    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    
    var toBuyItems = [
        { name: "cookies", quantity: 10, pricePerItem: 2.00 },
        { name: "grapes", quantity: 3, pricePerItem: 0.99 },
        { name: "soda", quantity: 6, pricePerItem: 1.50 },
        { name: "oranges", quantity: 2, pricePerItem: 1.00 },
        { name: "apples", quantity: 4, pricePerItem: 3.26 }
    ];
    
    // init empty array to store the bought items
    var boughtItems = [];
    
    service.getToBuyItems = function () {
      return toBuyItems;
    };
    
    service.getBoughtItems = function () {
      return boughtItems;
    };
    
    service.buyItem = function (itemIndex) {
      var item = toBuyItems.splice(itemIndex, 1)[0];
      boughtItems.push(item);
    };
  }

  function AngularDollarFilter() {
    return function (input) {
      return "$$$" + input.toFixed(2); // applying filter adds 3 $ signs
    };
  }

})();
