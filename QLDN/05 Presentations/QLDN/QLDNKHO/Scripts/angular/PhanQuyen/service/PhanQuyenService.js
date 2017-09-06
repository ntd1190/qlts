(function () {
    'use strict';


    angular.module('app')
        .factory('PhanQuyenService', PhanQuyenService);

    function PhanQuyenService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.main/PhanQuyen/',
            GetList: 'GetListChucNangByVaiTroId',

        }

        var service = {
            getById: getById,
        }

        return service;


        function getById(id,loai) {
            id = id || 0;

            var url = api.url + api.GetList;

            var req = {
                method: 'POST',
                url: url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ VaiTroId: id,Loai:loai })
            }
            return $http(req);
        }

 

    }
})();