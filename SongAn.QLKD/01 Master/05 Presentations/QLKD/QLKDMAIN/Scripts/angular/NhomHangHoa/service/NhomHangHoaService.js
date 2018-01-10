(function () {
    'use strict';

    angular
        .module('app')
        .factory('NhomHangHoaService', NhomHangHoaService);

    function NhomHangHoaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/NhomHangHoa/',
            GetComboboxById: 'GetListcbxNhomHangHoaById',
        }

        var service = {
            GetComboboxById: GetComboboxById
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, NhomHangHoaId, MaNhomHangHoa, FunctionCode) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    NhomHangHoaId: NhomHangHoaId,
                    MaNhomHangHoa: MaNhomHangHoa,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }

    }
})();