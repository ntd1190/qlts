(function () {
    'use strict';

    angular
        .module('app')
        .factory('BienBanKiemKeService', BienBanKiemKeService);

    function BienBanKiemKeService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/BienBanKiemKe/',
            GetPage: 'GetListBienBanKiemKeByProjection',
            GetPageDetail: 'GetListBienBanKiemKeChiTietByKiemKeId',
            GetPageHeaderById: 'GetListBienBanKiemKeById',
            GetPageBanKiemKeById: 'GetListBanKiemKeByKiemKeId',
            DeleteList: 'DeleteListBienBanKiemKeById',
            insert: 'InsertBienBanKiemKe',
            update: 'UpdateBienBanKiemKeById'
        }

        var service = {
            getPage: getPage,
            GetPageDetail: GetPageDetail,
            GetPageHeaderById: GetPageHeaderById,
            GetPageBanKiemKeById:GetPageBanKiemKeById,
            DeleteList: DeleteList,
            insert: insert,
            update: update
        };

        return service;

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, SoPhieu, PhongBanId) {
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
                    SoChungTu: SoPhieu,
                    TuNgay: TuNgay,
                    DenNgay: DenNgay,
                    NhanVienId: NhanVienId,
                    PhongBanId:PhongBanId
                })
            }

            return $http(req);
        }

        function GetPageDetail(BienBanKiemKeId, PhongBanId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KiemKeId: BienBanKiemKeId,
                    PhongBanId: PhongBanId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(BienBanKiemKeId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KiemKeId: BienBanKiemKeId
                })
            }

            return $http(req);
        }
        
        function GetPageBanKiemKeById(BienBanKiemKeId) {
            var url = api.url + api.GetPageBanKiemKeById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KiemKeId: BienBanKiemKeId
                })
            }

            return $http(req);
        }
        function DeleteList(BienBanKiemKeIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KiemKeIds: BienBanKiemKeIds
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
                    phieuKiemKe: data.phieuBienBanKiemKe,
                    listChiTiet: data.listChiTiet,
                    listBanKiemKe: data.listBanKiemKe,
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
                    kiemKeId: data.BienBanKiemKeId,
                    phieuKiemKe: data.phieuBienBanKiemKe,
                    listChiTiet: data.listChiTiet,
                    listBanKiemKe: data.listBanKiemKe,
                    loginId: data.loginId
                })
            }

            return $http(req);
        }
    }
})();