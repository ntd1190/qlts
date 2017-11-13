(function () {
    'use strict';

    angular
        .module('app')
        .factory('NhomKhachHangService', NhomKhachHangService);

    function NhomKhachHangService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKD/NhomKhachHang/',
            GetComboboxByPhongBanId: 'GetListcbxNhomKhachHangById',
        }

        var service = {
            GetComboboxById: GetComboboxById,
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, NhomKhachHangId, FunctionCode) {
            var url = api.url + api.GetComboboxByPhongBanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    NhomKhachHangId: NhomKhachHangId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
    }
})();