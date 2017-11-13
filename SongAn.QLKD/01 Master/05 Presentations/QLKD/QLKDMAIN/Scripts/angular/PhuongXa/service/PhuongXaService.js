(function () {
    'use strict';

    angular
        .module('app')
        .factory('PhuongXaService', PhuongXaService);

    function PhuongXaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKD/PhuongXa/',
            GetComboboxByPhongBanId: 'GetListcbxPhuongXaById',
        }

        var service = {
            GetComboboxById: GetComboboxById,
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, PhuongXaId, QuanHuyenId, FunctionCode) {
            var url = api.url + api.GetComboboxByPhongBanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    PhuongXaId: PhuongXaId,
                    QuanHuyenId: QuanHuyenId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
    }
})();