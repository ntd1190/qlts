(function () {
    'use strict';


    angular
        .module('app')
        .factory('LoaiNghiPhepService', LoaiNghiPhepService);


    function LoaiNghiPhepService($http, API_BASE) {
     
        
        var api = {
            url: API_BASE + 'Api.QLNS/LoaiNghiPhep/',
            GetFilter: 'GetListLoaiNghiPhepByCriteria',
            GetById: 'GetLoaiNghiPhepById',
            insert: 'InsertLoaiNghiPhep',
            update: 'UpdateLoaiNghiPhep',
            removeList: 'DeleteListLoaiNghiPhep',
        }

        var service = {
            getFilter: getFilter,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            getListLuocSu: getListLuocSu,
        };

        return service;

     
        function getFilter(draw, start, length, searchString, sortName, sortDir, fields

          ) {
            var url = api.url + api.GetFilter;
            
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    sortName: sortName,
                    sortDir: sortDir,
                    SEARCH_STRING: searchString,
                    MA_FORM: '',
                    FIELD:fields
                })
            }

            return $http(req);
        }

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ id: id })
            }
            return $http(req);
        };

        function insert(obj) {
            debugger
            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }

            return $http(req);
        };

        function update(obj) {
            var url = api.url + api.update;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }

            return $http(req);
        };

     

        /* Xóa logic, set thuộc tính XoaYN = 'Y' */
        function removeList(data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Content-type': 'application/json'
                },
                data: { deleteObjs: angular.toJson(data) }
            }

            return $http(req);
        }

        function getListLuocSu(draw, start, length, searchString, sortName, sortDir, fields) {
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
        }
    }
})();