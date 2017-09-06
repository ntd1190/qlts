(function () {
    'use strict';


    angular
        .module('app')
        .factory('KhoXuatNhapTonService', KhoXuatNhapTonService);


    function KhoXuatNhapTonService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKho/KhoXuatNhapTon/',
            GetFilter: 'GetListXuatNhapTon'
        }

        var service = {
            getFilter: getFilter
        };

        return service;


        function getFilter(data) {
            var url = api.url + api.GetFilter;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: data.draw,
                    start: data.start,
                    length: data.length,
                    sortName: data.sortName,
                    sortDir: data.sortDir,
                    TuNgay: data.TuNgay,
                    DenNgay: data.DenNgay,
                    KhoId: data.KhoHangId,
                    LoginId: data.LoginId
                })
            }

            return $http(req);
        }

    }
})();