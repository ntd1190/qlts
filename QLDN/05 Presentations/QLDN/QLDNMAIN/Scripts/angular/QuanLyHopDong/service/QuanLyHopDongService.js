/*****************************************************************************
1. Create Date : 2017.05.25
2. Creator     : NGUYỄN THANH BÌNH
3. Description : javascript chức năng quản lý hợp đồng
4. History     : 2017.05.25 (Nguyễn Thanh Bình) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app').factory('QuanLyHopDongService', service);
    function service($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.qlns/QuanLyHopDong/',
            insert: 'InsertQuanLyHopDong',
            update: 'UpdateQuanLyHopDong',
            updateXoa: 'UpdateXoaQuanLyHopDong',
            getListByNhanVienId: 'GetListQuanLyHopDongByNhanVienId',
            getById: 'GetListQuanLyHopDongById',
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
            updateXoa: function (data) {
                var url = api.url + api.updateXoa;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        //'Content-type': 'application/json'
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
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            getById: function (data) {
                var url = api.url + api.getById;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },

            getListLuocSu: function (draw, start, length, searchString, sortName, sortDir, fields) {
                var url = API_BASE + 'api.QLNS/LuocSu/GetListLuocSuByCriteria';
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({
                        draw: draw,
                        start: start,
                        length: length,
                        search: searchString,
                        sortName: sortName,
                        sortDir: sortDir,
                        fields: fields,
                    })
                }

                return $http(req);
            },

        };
    }
})();