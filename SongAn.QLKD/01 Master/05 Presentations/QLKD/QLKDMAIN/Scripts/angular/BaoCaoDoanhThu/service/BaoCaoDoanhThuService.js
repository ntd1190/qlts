(function () {
    'use strict';

    angular
        .module('app')
        .factory('BaoCaoDoanhThuService', BaoCaoDoanhThuService);

    function BaoCaoDoanhThuService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/BaoCaoDoanhThu/',
            GetPage: 'GetListBaoCaoDoanhThuByProjection'
        }

        var service = {
            getPage: getPage,
        };

        return service;

        function getPage(draw, start, length, searchString, searchLoaiHopDongId, tuNgay, denNgay, sortName, sortDir, fields, UserId, NhanVienId) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    search: searchString,
                    searchLoaiHopDongId: searchLoaiHopDongId,
                    tuNgay: tuNgay,
                    denNgay: denNgay,
                    sortName: sortName,
                    sortDir: sortDir,
                    UserId: UserId,
                    NhanVienId: NhanVienId,
                })
            }

            return $http(req);
        }


    }
})();