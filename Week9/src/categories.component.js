(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categoriesList', {
      templateUrl: 'src/categorieslist.html',
      bindings: {
        categories: '<'
      }
    });

})();