(function () {
    'use strict';


    angular
        .module('app')
        .factory('TangCaService', TangCaService);


    function TangCaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLNS/TangCa/',
            GetFilter: 'GetListTangCaByCriteria',
            GetById: 'GetTangCaById',
            insert: 'InsertTangCa',
            update: 'UpdateTangCa',
            removeList: 'UpdateXoaListTangCa',
            deleteList: 'UpdateTangCa'
        }

        var service = {
            getFilter: getFilter,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            deleteList: deleteList,
            getListLuocSu: getListLuocSu,
        };

        return service;


        function getFilter(data) {
            var url = api.url + api.GetFilter;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: data.draw,
                    start: data.start,
                    length: data.length,
                    sortName: data.sortName,
                    sortDir: data.sortDir,
                    FIELD: data.fields,
                    MA_FORM: data.MaForm,
                    SEARCH_STRING: data.searchString,
                    LOAI: data.Loai,
                    NGUOI_DUYET: data.NguoiDuyetIds,
                    TRANG_THAI: data.MaTrangThai,
                    NGAY_BAT_DAU: data.NgayBatDau,
                    NGAY_KET_THUC: data.NgayKetThuc,
                    XOA_YN: data.XoaYN,
                    LoginId: data.UserLoginId
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

        function deleteList(ids) {
            var url = api.url + api.deleteList;

            var param = { ids: ids };

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(param)
            }

            return $http(req);
        }


        /* Xóa logic, set thuộc tính XoaYN = 'Y' */
        function removeList(data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json' },
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