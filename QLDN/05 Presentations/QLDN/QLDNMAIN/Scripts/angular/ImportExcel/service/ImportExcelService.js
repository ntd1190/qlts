(function () {
    'use strict';

    angular
        .module('app')
        .factory('ImportExcelService', ImportExcelService);

    function ImportExcelService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/ImportExcel/',
            Import: 'ImportExcelChamCong',

        }

        var service = {
            ImportData: ImportData,
        };

        return service;

        function ImportData(data) {
            var url = api.url + api.Import;

            var req = {
                method: "POST",
                url: url,
                data: { chamCong: angular.toJson(data) },
                headers: { 'Content-type': 'application/json' }
            }
            return $http(req);
        }

     
    }
})();