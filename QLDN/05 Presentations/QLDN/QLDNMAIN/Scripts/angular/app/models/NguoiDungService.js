(function () {
    'use strict';
    var api_url = 'http://localhost:20552/api/';

    angular.module('app')
        .factory('NguoiDungService', NguoiDungService);

    function NguoiDungService($http) {

        function getAll() {
            return $http.get(api_url+'Test/GetListNguoiDung')
        }

        function findAll(text) {
            text = text || '';
            return $http.get(api_url + 'Test/GetListNguoiDungBySearchString?search=' + text);
        }

        var service = {
            getAll: getAll,
            findAll: findAll
        }

        return service;
    }
})();