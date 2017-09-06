(function () {
    'use strict';

    angular
        .module('app')
        .factory('ImportDauKyService', ImportDauKyService);

    function ImportDauKyService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKho/KhoImportDauKy/',
            Import: 'ImportDauKy',

        }

        var service = {
            ImportData: ImportData,
        };

        return service;

        function ImportData(loginId, data) {
            var url = api.url + api.Import;

            var req = {
                method: "POST",
                url: url,
                data: { loginId: loginId, dauKy: angular.toJson(data) },
                headers: { 'Content-type': 'application/json' }
            }
            return $http(req);
        }


    }
})();