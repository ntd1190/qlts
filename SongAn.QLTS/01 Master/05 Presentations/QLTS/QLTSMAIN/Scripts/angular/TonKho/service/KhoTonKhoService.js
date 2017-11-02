(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoTonKhoService', KhoTonKhoService);

    function KhoTonKhoService($http, API_BASE) {
        var api = {
            url: API_BASE+'Api.QLTS/KhoTonKho/',
            getPageTonKho: 'GetListTonKhoByProjection',
           
    }

    var service = {
        getPageTonKho: getPageTonKho,

        };

        return service;
        function getPageTonKho(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, KhoTaiSanId) {
            var url = api.url + api.getPageTonKho;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    search: searchString,
                    sortName: sortName,
                    sortDir: sortDir,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId,
                    KhoTaiSanId: KhoTaiSanId
                })
            }

            return $http(req);
        }

    }
})();