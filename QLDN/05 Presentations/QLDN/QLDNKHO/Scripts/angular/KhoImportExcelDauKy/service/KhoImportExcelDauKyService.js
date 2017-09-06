(function () {
    'use strict';

    angular
        .module('app')
        .factory('ImportExcelDauKyService', ImportExcelDauKyService);

    function ImportExcelDauKyService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKho/KhoImportExcelDauKy/',
            Import: 'ImportExcelDauKy',

        }

        var service = {
            ImportData: ImportData,
        };

        return service;

        function ImportData(kyId, data) {
            var url = api.url + api.Import;

            var req = {
                method: "POST",
                url: url,
                data: {kyId: kyId, dauKy: angular.toJson(data) },
                headers: { 'Content-type': 'application/json' }
            }
            return $http(req);
        }


    }
})();