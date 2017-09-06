(function () {
    'use strict';

    angular.module('app')
        .factory('VaiTroService', VaiTroService);

    function VaiTroService($http) {
        var api = {
            //url: API_BASE + 'http://localhost/qldnapi/api/',
            url: API_BASE + 'api.main/vaitro/',
            insert: 'vaitro/add',
            update: 'vaitro/update',
            GetAll: 'vaitro/GetAll',
            GetById: 'vaitro/GetById',
            find: 'vaitro/Find',
            getList: 'vaitro/getList',
            getListCount: 'vaitro/getListCount',
            getListProjection: 'vaitro/getListProjection',
            remove: 'vaitro/delete',
        }

        function insert(obj) {
            console.log(obj);
            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: $.param(obj)
            }

            return $http(req);
        }

        function getAll() {
            var url = api.url + api.getAll;

            var req = {
                method: 'GET',
                url: url
            }

            return $http(req);
        }

        function findAll(text) {
            text = text || '';
            var url = api.url + api.find;

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
            console.log(obj);
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }

            return $http(req);
        }

        var service = {
            insert: insert,
            update: update,
            getAll: getAll,
            findAll: findAll,
            getById: getById,
            remove: remove
        }

        return service;
    }
})();