(function () {
    'use strict';

    angular
        .module('app')
        .factory('GhiGiamService', GhiGiamService);

    function GhiGiamService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/GhiGiam/',
            GetPage: 'GetListGhiGiamByProjection',
            GetPageDetail: 'GetListGhiGiamChiTietByGhiGiamId',
            GetPageHeaderById: 'GetGhiGiamById',
            DeleteList: 'DeleteListGhiGiamById',
            insert: 'InsertGhiGiam',
            update: 'UpdateGhiGiam'
        }

        var service = {
            getCombobox: getCombobox,
            getPage: getPage,
            GetPageDetail: GetPageDetail,
            GetPageHeaderById: GetPageHeaderById,
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
                    PhongBanId: PhongBanId
                })
            }

            return $http(req);
        }

        function GetPageDetail(GhiGiamId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GhiGiamId: GhiGiamId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(GhiGiamId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GhiGiamId: GhiGiamId
                })
            }

            return $http(req);
        }

        function DeleteList(GhiGiamIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ids: GhiGiamIds
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
                    GhiGiam: data.phieuGhiGiam,
                    GhiGiamchitiet: data.listChiTiet,
                    NguoiTao: data.loginId,
                    CoSoId: data.CoSoId
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
                   
                    GhiGiam: data.phieuGhiGiam,
                    GhiGiamchitiet: data.listChiTiet,
                    NguoiTao: data.loginId,
                    CoSoId: data.CoSoId
                })
            }

            return $http(req);
        }

        function getCombobox(CoSoId, NhanVienId, Search) {
            var url = api.url + api.GetCombobox;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

    }
})();