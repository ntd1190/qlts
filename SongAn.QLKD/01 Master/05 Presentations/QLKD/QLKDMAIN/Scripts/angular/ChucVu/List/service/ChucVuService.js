(function () {
    'use strict';


    angular
        .module('app')
        .factory('ChucVuService', ChucVuService);


    function ChucVuService($http, API_BASE) {
     
        
        var api = {
            url: API_BASE + 'Api.QLNS/ChucVu/',
            GetFilter: 'GetListChucVuByCriteria',
            GetById: 'GetChucVuById',
            insert: 'InsertChucVu',
            update: 'UpdateChucVu',
            removeList: 'UpdateXoaListChucVu',
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
                    FIELDS:fields
                })
            }

            return $http(req);
        }

        function getById(ChucVuId, LoginId) {
            
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ ChucVuId: ChucVuId, LoginId: LoginId })
            }
            return $http(req);
        };

        function insert(obj, LoginId) {
            debugger;
            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ ChucVuId:obj.ChucVuId, MaChucVu: obj.MaChucVu, TenChucVu:obj.TenChucVu, GhiChu:obj.GhiChu, LoginId: LoginId })
            }

            return $http(req);
        };

        function update(obj, LoginId) {
            debugger;
            var url = api.url + api.update;            
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ ChucVuId: obj.ChucVuId, MaChucVu: obj.MaChucVu, TenChucVu: obj.TenChucVu, GhiChu: obj.GhiChu, CtrVersion: obj.CtrVersion, LoginId: LoginId })
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
                data: { listChucVu: angular.toJson(data.listChucVu), loginId: data.loginId }
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