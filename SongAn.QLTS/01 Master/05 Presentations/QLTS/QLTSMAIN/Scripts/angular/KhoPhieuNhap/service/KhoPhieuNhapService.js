(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoPhieuNhapService', KhoPhieuNhapService);

    function KhoPhieuNhapService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/KhoPhieuNhap/',
            GetPage: 'GetListKhoPhieuNhapByProjection',
            GetPageDetail: 'GetListKhoPhieuNhapChiTietById',
            GetPageHeaderById: 'GetListKhoPhieuNhapById',
            DeleteList: 'DeleteListKhoPhieuNhapById',
            insert: 'InsertKhoPhieuNhap',
            update: 'UpdateKhoPhieuNhapById'
        }

        var service = {
            getPage: getPage,
            GetPageDetail: GetPageDetail,
            GetPageHeaderById: GetPageHeaderById,
            DeleteList: DeleteList,
            insert: insert,
            update: update
        };

        return service;

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, KhoTaiSanId, SoPhieu) {
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
                    SoPhieu: SoPhieu,
                    TuNgay: TuNgay,
                    DenNgay: DenNgay,
                    KhoTaiSanId: KhoTaiSanId,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

        function GetPageDetail(KhoPhieuNhapId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhoPhieuNhapId: KhoPhieuNhapId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(KhoPhieuNhapId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhoPhieuNhapId: KhoPhieuNhapId
                })
            }

            return $http(req);
        }
        function GetPageTongHopById(KhoPhieuNhapId) {
            var url = api.url + api.GetPageTongHopById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhoPhieuNhapId: KhoPhieuNhapId
                })
            }

            return $http(req);
        }
        function DeleteList(KhoPhieuNhapIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhoPhieuNhapIds: KhoPhieuNhapIds
                })
            }

            return $http(req);
        }
        function insert(data) {
            var url = api.url + api.insert;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    phieuKhoPhieuNhap: data.phieuKhoPhieuNhap,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId
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
                    khoPhieuNhapId: data.khoPhieuNhapId,
                    phieuKhoPhieuNhap: data.phieuKhoPhieuNhap,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId
                })
            }

            return $http(req);
        }

    }
})();