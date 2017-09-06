/*****************************************************************************
1. Create Date : 2017.05.04
2. Creator     : Nguyen Thanh Binh
3. Description : javascript chức năng phiếu công tác
4. History     : 2017.05.04(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app').factory('PhieuCongTacService', service);
    function service($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.qlns/phieucongtac/',
            insert: 'insertphieucongtac',
            update: 'updatephieucongtac',
            xoaList: 'updateXoaListPhieuCongTac',
            getPage: 'GetListPhieuCongTacByCriteria',
            getById: 'GetPhieuCongTacById',
            insertChiTiet: 'insertchitiet',
            updateChiTiet: 'updatechitiet',
            getChiTietById: 'GetListChiTietByPhieuCongTacId',
            xoaListChiTiet: 'updateXoaListChiTiet'
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
                    data: $.param({
                        noiDung: data.tieuDe,
                        ngayDi: data.ngayDi,
                        ngayVe: data.ngayVe,
                        nhanVienId: data.nhanVienId,
                        soNgay: data.soNgay,
                        soNgay: data.soNgay,
                        loginId: data.loginId,
                    })
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
                    data: $.param({
                        noiDung: data.tieuDe,
                        ngayDi: data.ngayDi,
                        ngayVe: data.ngayVe,
                        nhanVienId: data.nhanVienId,
                        soNgay: data.soNgay,
                        phieuCongTacId: data.phieuCongTacId,
                        ctrVersion: data.ctrVersion,
                        loginId: data.loginId,
                    })
                }
                return $http(req);
            },
            xoaList: function (data) {
                var url = api.url + api.xoaList;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Content-type': 'application/json'
                    },
                    data: { listPhieuCongTac: angular.toJson(data.listPCT), loginId: data.loginId }
                }

                return $http(req);
            },
            getPage: function (data) {
                var url = api.url + api.getPage;

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
                    data: $.param({
                        phieuCongTacIds: data.phieuCongTacIds,
                        draw: data.draw,
                        start: data.start,
                        length: data.length,
                        sortName: data.sortName,
                        sortDir: data.sortDir
                    })
                }

                return $http(req);
            },
            getChiTietById: function (data) {
                var url = api.url + api.getChiTietById;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param({
                        phieuCongTacId: data.phieuCongTacId,
                        draw: data.draw,
                        start: data.start,
                        length: data.length,
                        sortName: data.sortName,
                        sortDir: data.sortDir
                    })
                }

                return $http(req);
            },

            insertChiTiet: function (data) {
                var url = api.url + api.insertChiTiet;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param({
                        phieuCongTacId: data.phieuCongTacId,
                        noiDung: data.noiDung,
                        ngay: data.ngay,
                        soLuong: data.soLuong,
                        donGia: data.donGia,
                        ghiChu: data.ghiChu,
                    })
                }
                return $http(req);
            },

            updateChiTiet: function (data) {
                var url = api.url + api.updateChiTiet;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param({
                        phieuCongTacChiTietId: data.phieuCongTacChiTietId,
                        noiDung: data.noiDung,
                        ngay: data.ngay,
                        soLuong: data.soLuong,
                        donGia: data.donGia,
                        ghiChu: data.ghiChu,
                        ctrVersion: data.ctrVersion,
                    })
                }
                return $http(req);
            },
            xoaListChiTiet: function (data) {
                var url = api.url + api.xoaListChiTiet;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Content-type': 'application/json'
                    },
                    data: { phieuCongTacChiTiet: angular.toJson(data) }
                }

                return $http(req);
            },
            getListTrangThai: function (data) {
                var url = API_BASE + 'api.qlns/trangthai/GetTrangThaiByChucNang';

                var req = {
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: $.param({
                        chucnang: data,
                    })
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