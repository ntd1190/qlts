(function () {
    'use strict';

    angular
        .module('app')
        .factory('DieuChuyenService', DieuChuyenService);

    function DieuChuyenService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/DieuChuyen/',
            GetPage: 'GetListDieuChuyenByProjection',
            GetPageDetail: 'GetListDieuChuyenChiTietByDieuChuyenId',
            GetPageHeaderById: 'GetListDieuChuyenByDieuChuyenId',
            DeleteList: 'DeleteListDieuChuyenById',
            insert: 'InsertDieuChuyen',
            update: 'UpdateDieuChuyenByDieuChuyenId'
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

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, SoPhieu) {
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
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

        function GetPageDetail(DieuChuyenId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DieuChuyenId: DieuChuyenId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(DieuChuyenId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DieuChuyenId: DieuChuyenId
                })
            }

            return $http(req);
        }

        function DeleteList(DieuChuyenIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DieuChuyenIds: DieuChuyenIds
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
                    phieuDieuChuyen: data.phieuDieuChuyen,
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
                    dieuChuyenId: data.DieuChuyenId,
                    phieuDieuChuyen: data.phieuDieuChuyen,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId
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