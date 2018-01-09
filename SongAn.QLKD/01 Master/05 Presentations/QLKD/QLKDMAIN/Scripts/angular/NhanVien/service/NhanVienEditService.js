(function () {
    'use strict';


    angular
        .module('app')
        .factory('NhanVienEditService', NhanVienEditService);


    function NhanVienEditService($http, API_BASE) {
        var api = {
            url: 'http://hr.ehis.vn/QLDNAPI/Api.QLNS/nhanvien/',

            /* dùng cho danh sách */
            GetPage: 'GetListNhanVienByCriteria',
            GetPageList: 'GetListNhanVienByCriteriaList',
            GetById: 'GetNhanVienById',
            insert: 'insertNhanVien',
            update: 'updateNhanVien',
            removeList: 'deleteListNhanVien',
            xoaList: 'UpdateXoaListNhanVien',

            /* dùng cho edit */
            insertThongTin: 'InsertThongTinNhanVien',
            updateThongTin: 'UpdateThongTinNhanVien',
            getThongTin: 'GetThongTinNhanVienById',
            getThongTinByMa: 'GetThongTinNhanVienByMa',
        }

        return {
            /*************************************
             * FOR LIST
             */

            getFilter: function (data) {
                var url = api.url + api.GetPage;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({
                        draw: data.draw,
                        start: data.start,
                        length: data.length,
                        search: data.searchString,
                        maForm: data.maForm,
                        sortName: data.sortName,
                        sortDir: data.sortDir,
                        fields: data.fields,
                        ngayFrom: data.tuyenDungFrom,
                        ngayTo: data.tuyenDungTo,
                        nhanVien: data.nhanVienIds,
                        phongBan: data.phongBanIds,
                        duAn: data.duAnIds,
                        chucVu: data.chucVuIds,
                        dangLamViec: data.dangLamViec,
                        Xoa: data.Xoa,
                        loginId: data.loginId,
                    })
                }

                return $http(req);
            },
            getPage: function (data) {
                var url = api.url + api.GetPageList;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({
                        draw: data.draw,
                        start: data.start,
                        length: data.length,
                        search: data.searchString,
                        maForm: data.maForm,
                        sortName: data.sortName,
                        sortDir: data.sortDir,
                        fields: data.fields,
                        ngayFrom: data.tuyenDungFrom,
                        ngayTo: data.tuyenDungTo,
                        nhanVien: data.nhanVienIds,
                        phongBan: data.phongBanIds,
                        duAn: data.duAnIds,
                        chucVu: data.chucVuIds,
                        dangLamViec: data.dangLamViec,
                        Xoa: data.Xoa,
                        loginId: data.loginId,
                    })
                }

                return $http(req);
            },
            getById: function (id) {
                var url = api.url + api.GetById;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({ id: id })
                }
                return $http(req);
            },
            insert: function insert(obj) {
                var url = api.url + api.insert;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(obj)
                }

                return $http(req);
            },
            update: function update(obj) {
                var url = api.url + api.update;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(obj)
                }

                return $http(req);
            },

            /* Xóa logic, set thuộc tính XoaYN = 'Y' */
            removeList: function (data) {
                var url = api.url + api.xoaList;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Content-type': 'application/json'
                    },
                    data: { nhanvien: angular.toJson(data) }
                }

                return $http(req);
            },

            /*********************************
             * FOR EDIT
             */
            insertThongTin: function (data) {
                var url = api.url + api.insertThongTin;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            updateThongTin: function (data) {
                var url = api.url + api.updateThongTin;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            getThongTin: function (id) {
                var url = api.url + api.getThongTin;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({ nhanvienid: id })
                }
                return $http(req);
            },
            getThongTinByMa: function (ma) {
                var url = api.url + api.getThongTinByMa;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({ ma: ma })
                }
                return $http(req);
            },
        };
    }
})();