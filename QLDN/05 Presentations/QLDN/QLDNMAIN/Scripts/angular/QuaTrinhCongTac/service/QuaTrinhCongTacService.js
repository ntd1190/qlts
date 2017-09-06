(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuaTrinhCongTacService', service);

    function service($http,API_BASE) {
        var api = {
            url: API_BASE + 'api.qlns/quatrinhcongtac/',
            insert: 'InsertQuaTrinhCongTac',
            update: 'UpdateQuaTrinhCongTac',
            deleteQTCT: 'DeleteQuaTrinhCongTac',
            getById: 'GetQuaTrinhCongTacById',
            getListByNhanVienId: 'GetListQuaTrinhCongTacByNhanVienId',
      }

        return {

            insert: function (data) {
                var url = api.url + api.insert;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param(data)
                }
                return $http(req);
            },

            update: function (data) {
                var url = api.url + api.update;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param(data)
                }
                return $http(req);
            },

            deleteQTCT: function (data) {
                var url = api.url + api.deleteQTCT;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param(data)
                }
                return $http(req);
            },

            getById: function (data) {
                var url = api.url + api.getById;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param(data)
                }
                return $http(req);
            },

            getListByNhanVienId: function (data) {
                var url = api.url + api.getListByNhanVienId;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param(data)
                }
                return $http(req);
            },


        }
    }
})();