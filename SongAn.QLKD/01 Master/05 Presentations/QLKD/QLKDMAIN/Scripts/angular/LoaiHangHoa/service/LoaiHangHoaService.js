(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoaiHangHoaService', LoaiHangHoaService);

    function LoaiHangHoaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/LoaiHangHoa/',
            GetComboboxById: 'GetListcbxLoaiHangHoaById',
        }

        var service = {
            GetComboboxById: GetComboboxById
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, LoaiHangHoaId, FunctionCode) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    LoaiHangHoaId: LoaiHangHoaId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }

    }
})();