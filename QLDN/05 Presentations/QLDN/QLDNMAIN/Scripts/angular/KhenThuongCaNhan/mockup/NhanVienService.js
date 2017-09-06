(function () {
    'use strict';


    angular
        .module('app')
        .factory('NhanVienService', NhanVienService);


    function NhanVienService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLNS/nhanvien/',
            GetPage: 'GetListNhanVienByCriteria',
            GetById: 'GetNhanVienById',
            insert: 'insertNhanVien',
            update: 'updateNhanVien',
            removeList: 'deleteListNhanVien',
        }

        var service = {
            getFilter: getFilter,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
        };

        return service;

        function getFilter(draw, start, length, searchString, maForm, sortName, sortDir, fields, tuyenDungFrom, tuyenDungTo, listNhanVien, listPhongBan, listDuAn, listChucVu, dangLamViec) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    search: searchString,
                    maForm: maForm,
                    sortName: sortName,
                    sortDir: sortDir,
                    fields: fields,
                    ngayFrom: tuyenDungFrom,
                    ngayTo: tuyenDungTo,
                    nhanVien: listNhanVien,
                    phongBan: listPhongBan,
                    duAn: listDuAn,
                    chucVu: listChucVu,
                    dangLamViec: dangLamViec,
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

        function removeList(ids) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ ids: ids })
            }

            return $http(req);
        }
    }
})();