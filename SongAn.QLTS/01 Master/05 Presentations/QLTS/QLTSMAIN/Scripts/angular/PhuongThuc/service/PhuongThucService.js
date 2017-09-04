(function () {
    'use strict';

    angular
        .module('app')
        .factory('PhuongThucService', function ($http, API_BASE) {
            var api = {
                url: API_BASE + 'Api.QLTS/PhuongThuc/',
                GetCombobox: 'GetListcbxPhuongThucByCriteria',
            }

            var service = {};

            service.getCombobox = function (CoSoId, NhanVienId, Search) {
                var url = api.url + api.GetCombobox;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({
                        Search: Search,
                        CoSoId: CoSoId,
                        NhanVienId: NhanVienId
                    })
                }

                return $http(req);
            }

            return service;
        })
})();