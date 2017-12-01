(function () {
    'use strict';

    angular
        .module('app')
        .factory('DanhGiaDoanhThuService', DanhGiaDoanhThuService);

    function DanhGiaDoanhThuService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/DanhGiaDoanhThu/',
            GetPage: 'GetListDanhGiaDoanhThuByProjection'
        }

        var service = {
            getPage: getPage,
        };

        return service;

        function getPage(Nam, NhanVienKDId, UserId, NhanVienId) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Nam:Nam,
                    NhanVienKDId:NhanVienKDId,
                    UserId: UserId,
                    NhanVienId: NhanVienId,
                })
            }

            return $http(req);
        }


    }
})();