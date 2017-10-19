(function () {
    'use strict';

    angular
        .module('app')
        .factory('GiayBaoHongService', GiayBaoHongService);

    function GiayBaoHongService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/GiayBaoHong/',
            GetPage: 'GetListGiayBaoHongByProjection',
            GetPageDetail: 'GetListGiayBaoHongChiTietByBaoHongId',
            GetPageHeaderById: 'GetListGiayBaoHongById',
            DeleteList: 'DeleteListGiayBaoHongById',
            insert: 'InsertGiayBaoHong',
            update: 'UpdateGiayBaoHongById',
            GetPageTongHopById: 'GetTongHopGiayBaoHongByBaoHongId'
        }

        var service = {
            getPage: getPage,
            GetPageDetail: GetPageDetail,
            GetPageHeaderById: GetPageHeaderById,
            DeleteList: DeleteList,
            insert: insert,
            update: update,
            GetPageTongHopById: GetPageTongHopById
        };

        return service;

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, PhongBanId, SoChungTu) {
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
                    SoChungTu: SoChungTu,
                    TuNgay: TuNgay,
                    DenNgay: DenNgay,
                    PhongBanId: PhongBanId,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

        function GetPageDetail(GiayBaoHongId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GiayBaoHongId: GiayBaoHongId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(GiayBaoHongId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GiayBaoHongId: GiayBaoHongId
                })
            }

            return $http(req);
        }
        function GetPageTongHopById(GiayBaoHongId) {
            var url = api.url + api.GetPageTongHopById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GiayBaoHongId: GiayBaoHongId
                })
            }

            return $http(req);
        }
        function DeleteList(GiayBaoHongIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GiayBaoHongIds: GiayBaoHongIds
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
                    phieuGiayBaoHong: data.phieuGiayBaoHong,
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
                    giayBaoHongId: data.giayBaoHongId,
                    phieuGiayBaoHong: data.phieuGiayBaoHong,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId
                })
            }

            return $http(req);
        }

    }
})();