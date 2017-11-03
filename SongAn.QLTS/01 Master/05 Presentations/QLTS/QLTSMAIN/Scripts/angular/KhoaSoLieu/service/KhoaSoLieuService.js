(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoaSoLieuService', KhoaSoLieuService);

    function KhoaSoLieuService($http, API_BASE) {
    var api = {
        url: API_BASE+'Api.QLTS/KhoaSoLieu/',
        CheckKhoaSoLieu: 'CheckKhoaSoLieu',

    }

    var service = {
        CheckKhoaSoLieu: CheckKhoaSoLieu,
        };

        return service;
        function CheckKhoaSoLieu(Nam,CoSoId) {
            var url = api.url + api.CheckKhoaSoLieu;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ Nam: Nam, CoSoId: CoSoId })
            }
            return $http(req);
        };
    }
})();