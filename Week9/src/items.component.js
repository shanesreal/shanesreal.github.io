(function () {
  'use strict';

  angular.module('MenuApp')
    .component('itemsList', {
      templateUrl: 'src/itemslist.html',
      bindings: {
        items: '<'
      }
    });

})();