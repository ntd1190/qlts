(function () {
    'use strict';


    angular.module('app')
        .factory('VaiTroService', VaiTroService);

    function VaiTroService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.main/vaitro/',
            
            insert: 'insertVaiTro',
            update: 'updateVaiTro',
            GetList: 'GetListVaiTro',
            GetById: 'GetVaiTroById',
            GetListBySearchString: 'GetListVaiTroBySearchString',
            GetComboboxById: 'GetListcbxVaiTroById',
            getList: 'getList',
            getListCount: 'getListCount',
            getListProjection: 'getListProjection',
            remove: 'deleteVaiTro',
        }

        var service = {
            insert: insert,
            update: update,
            getAll: getAll,
            findAll: findAll,
            getById: getById,
            remove: remove,
            GetComboboxById: GetComboboxById,
        }

        return service;

        function insert(obj) {
            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }

            return $http(req);
        }

        function getAll() {
            var url = api.url + api.GetList;

            var req = {
                method: 'GET',
                url: url
            }

            return $http(req);
        }

        function findAll(text) {
            text = text || '';
            var url = api.url + api.GetListBySearchString;

            var req = {
                method: 'GET',
                url: url,
                params: { search: text }
            }
            return $http(req);
        }

        function remove(id) {
            id = id || 0;

            var url = api.url + api.remove;

            var req = {
                method: 'GET',
                url: url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                params: { id: id }
            }
            return $http(req);

        }
        function getById(id) {
            id = id || 0;

            var url = api.url + api.GetById;

            var req = {
                method: 'GET',
                url: url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                params: { id: id }
            }
            return $http(req);
        }

        function update(obj) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }

            return $http(req);
        }

        function GetComboboxById(UserId, NhanVienId, Search, VaiTroId, FunctionCode) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    NhanVienId: NhanVienId,
                    VaiTroId: VaiTroId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }

    }
})();