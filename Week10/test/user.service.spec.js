(function () {
"use strict";

describe('UserService', function () {
  var UserService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      UserService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return menu item when it exists', function() {
    var menuItem = {
      name: 'Orange Chicken',
      short_name: 'L1'
    };

    $httpBackend.expectGET(ApiPath + '/menu_items/L/menu_items/0.json')
      .respond(menuItem);

    UserService.validateMenuItem('L1').then(function(result) {
      expect(result.name).toBe('Orange Chicken');
    });

    $httpBackend.flush();
  });

  it('should return null when menu item does not exist', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/Z/menu_items/99.json')
      .respond(null);

    UserService.validateMenuItem('Z100').then(function(result) {
      expect(result).toBe(null);
    });

    $httpBackend.flush();
  });

});

})();