(function () {
    'use strict';

    angular
        .module('app')
        .factory('CauHinhHeThongService', CauHinhHeThongService);

    function CauHinhHeThongService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/ThongSo/',
            insert: 'InsertCauHinhHeThong',
            update: 'UpdateThongSo',
            GetList: 'GetListCauHinhHeThong',
            GetPage: 'GetListThongSoByProjection',
            GetById: 'GetCauHinhHeThongById',
            GetListBySearchString: 'GetListCauHinhHeThongBySearchString',
            getList: 'getList',
            getListCount: 'getListCount',
            getListProjection: 'getListProjection',
            remove: 'DeleteCauHinhHeThong',
            removeList: 'DeleteListCauHinhHeThong',
    }

    var service = {
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            remove: remove,
        };

        return service;

        function removeList(ids) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ids: ids
                })
            }

            return $http(req);
        }
        function remove(ids) {
            var url = api.url + api.remove;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ids: ids
                })
            }

            return $http(req);
        }
        function getPage(NhanVienId) {
            var url =api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }
        function insert(data) {
            if (!data) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    CauHinhHeThong: data.CauHinhHeThong,
                })
            }
            return $http(req);
        }

        function update(data) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    CauHinhHeThong: data.CauHinhHeThong,
                    NhanVienId: data.NhanVienId
                })
            }
            return $http(req);
        }

        function getById(id, thangnam, CauHinhHeThongid, CoSoId) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KhoTaiSanId: id, ThangNam: thangnam, CauHinhHeThongId: CauHinhHeThongid, CoSoId: CoSoId })
            }
            return $http(req);
        };
        
        function getList() {
            var url = api.url + api.GetListBySearchString;

            var req = {
                url: url,
                method: 'GET'
            }

            return $http(req);
        }
    }
})();