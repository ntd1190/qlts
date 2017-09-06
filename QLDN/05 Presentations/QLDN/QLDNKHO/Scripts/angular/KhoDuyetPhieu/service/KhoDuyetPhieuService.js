(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoDuyetPhieuService', KhoDuyetPhieuService);

    function KhoDuyetPhieuService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLKho/KhoDuyetPhieu/',
            GetPage: 'GetListKhoDuyetPhieuByCriteria',
        }

        return {
            // phiếu nhập

            getPage: function (data) {
                var url = api.url + api.GetPage;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
 
        };
    }
})();