(function () {
    'use strict';

    angular
        .module('app')
        .factory('HangHoaService', HangHoaService);

    function HangHoaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/HangHoa/',
            GetComboboxById: 'GetListcbxHangHoaById',
        }

        var service = {
            GetComboboxById: GetComboboxById
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, HangHoaId, FunctionCode) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    HangHoaId: HangHoaId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }

    }
})();