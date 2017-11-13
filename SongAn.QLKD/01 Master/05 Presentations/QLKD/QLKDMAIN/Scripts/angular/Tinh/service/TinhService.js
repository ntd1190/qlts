(function () {
    'use strict';

    angular
        .module('app')
        .factory('TinhService', TinhService);

    function TinhService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKD/Tinh/',
            GetComboboxByPhongBanId: 'GetListcbxTinhById',
        }

        var service = {
            GetComboboxById: GetComboboxById,
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, TinhThanhPhoId, FunctionCode) {
            var url = api.url + api.GetComboboxByPhongBanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    TinhThanhPhoId: TinhThanhPhoId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
    }
})();