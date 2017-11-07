(function () {
    'use strict';

    angular
        .module('app')
        .factory('TheoDoiService', TheoDoiService);

    function TheoDoiService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/TheoDoi/',
            insert: 'InsertTheoDoi',
            update: 'UpdateTheoDoiById',
            GetPage: 'GetListTheoDoiByProjection',
            GetById: 'GetListTheoDoiById',
            removeList: 'DeleteListTheoDoiById',
        }

        var service = {
            GetPage: GetPage,
            GetById: GetById,
            insert: insert,
            update: update,
            removeList: removeList,
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

        function GetPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId) {
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
                    sortName: sortName,
                    sortDir: sortDir,
                    CoSoId: CoSoId,
                    TuNgay: '09/09/2017',
                    DenNgay: '09/09/2017',
                    NhanVienId: NhanVienId,
                })
            }

            return $http(req);
        }

        function insert(obj) {
            if (!obj) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    TaiSanId: obj.TaiSanId,
                    NgayGhiTang: obj.NgayGhiTang,
                    NgayTrangCap: obj.NgayTrangCap,
                    NgayBatDauSuDung: obj.NgayBatDauSuDung,
                    PhongBanId: obj.PhongBanId,
                    NhanVienId: obj.NhanVienId,
                    SLTon: obj.SLTon,
                    SLTang: 0,
                    SLGiam: 0,
                    HopDongId: obj.HopDongId,
                    CoSoId: obj.CoSoId,
                    NguoiTao: obj.NguoiTao
                })
            }
            return $http(req);
        }
        
        function update(obj, obj_old) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    TaiSanId: obj.TaiSanId,
                    TaiSanId_Old: obj_old.TaiSanId,
                    NgayGhiTang: obj.NgayGhiTang,
                    NgayTrangCap: obj.NgayTrangCap,
                    NgayBatDauSuDung: obj.NgayBatDauSuDung,
                    PhongBanId: obj.PhongBanId,
                    PhongBanId_Old: obj_old.PhongBanId,
                    NhanVienId: obj.NhanVienId,
                    NhanVienId_Old: obj_old.NhanVienId,
                    Nam: obj.Nam,
                    SLTon: obj.SLTon,
                    SLTang: 0,
                    SLGiam: 0,
                    HopDongId: obj.HopDongId,
                    CoSoId: obj.CoSoId,
                    NguoiTao: obj.NguoiTao
                })
            }
            return $http(req);
        }

        function GetById(data) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    TaiSanId: data.taiSanId,
                    PhongBanId : data.phongBanId,
                    NhanVienId: data.nhanVienId,
                    Nam: data.nam
                })
            }
            return $http(req);
        };
    }
})();