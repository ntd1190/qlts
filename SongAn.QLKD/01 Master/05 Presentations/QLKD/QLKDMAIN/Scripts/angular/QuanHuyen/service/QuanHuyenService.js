(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuanHuyenService', QuanHuyenService);

    function QuanHuyenService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKD/QuanHuyen/',
            GetComboboxByPhongBanId: 'GetListcbxQuanHuyenById',
        }

        var service = {
            GetComboboxById: GetComboboxById,
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, QuanHuyenId, TinhId, FunctionCode) {
            var url = api.url + api.GetComboboxByPhongBanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    QuanHuyenId: QuanHuyenId,
                    TinhId: TinhId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
    }
})();