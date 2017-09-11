(function () {
    'use strict';

    angular
        .module('app')
        .factory('GhiTangService', GhiTangService);

    function GhiTangService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/GhiTang/',
            GetPage: 'GetListGhiTangByProjection',
            GetPageDetail: 'GetListGhiTangChiTietByGhiTangId',
            GetPageHeaderById: 'GetListGhiTangByGhiTangId',
            DeleteList: 'DeleteListGhiTangById',
            insert: 'InsertGhiTang',
            update: 'UpdateGhiTangByGhiTangId'
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

        function GetPageDetail(GhiTangId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GhiTangId: GhiTangId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(GhiTangId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GhiTangId: GhiTangId
                })
            }

            return $http(req);
        }

        function DeleteList(GhiTangIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    GhiTangIds: GhiTangIds
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
                    phieuGhiTang: data.phieuGhiTang,
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
                    ghiTangId: data.ghiTangId,
                    phieuGhiTang: data.phieuGhiTang,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId,
                    compare: data.compare
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