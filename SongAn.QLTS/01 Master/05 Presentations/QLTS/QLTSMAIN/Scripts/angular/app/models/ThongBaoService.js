(function () {
    'use strict';

    angular
        .module('app')
        .factory('ThongBaoService', ThongBaoService);

    function ThongBaoService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.Main/ThongBao/',
            getList: 'GetListThongBao',
            update: 'UpdateThongBaoById'
        }

        var service = {
            getList: getList,
            update: update
        };

        return service;

        function getList(CoSoId, UserId) {

            var url = api.url + api.getList;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    CoSoId: CoSoId,
                    UserId: UserId

                })
            }
            return $http(req);
        }

        function update(thongBaoId) {

            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ThongBaoId: thongBaoId

                })
            }
            return $http(req);
        }
    }
})();