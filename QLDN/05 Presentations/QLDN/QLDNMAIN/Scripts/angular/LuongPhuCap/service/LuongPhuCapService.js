(function () {
    'use strict';
    angular.module('app')
        .factory('LuongPhuCapService', service);

    function service($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLNS/luongphucap/',
            InsertLuongPhuCap: 'InsertLuongPhuCap',
            UpdateLuongPhuCap: 'UpdateLuongPhuCap',
            GetLuongPhuCapByNhanVienId: 'GetLuongPhuCapByNhanVienId',
        }

        return {
            insertLuongPhuCap: function (data) {
                var url = api.url + api.InsertLuongPhuCap;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);

            },

            updateLuongPhuCap: function (data) {
                var url = api.url + api.UpdateLuongPhuCap;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);

            },

            getByNhanVienId: function (data) {
                var url = api.url + api.GetLuongPhuCapByNhanVienId;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({
                        nhanVienId: data.nhanVienId,
                    })
                }

                return $http(req);

            },

        };

    }
})();