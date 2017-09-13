(function () {
    'use strict';

    angular
        .module('app')
        .factory('BaoDuongService', BaoDuongService);

    function BaoDuongService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/BaoDuong/',
            GetPage: 'GetListBaoDuongByProjection',
            GetPageDetail: 'GetListSuaChuaByBaoDuongId',
            GetPageHeaderById: 'GetListBaoDuongById',
            DeleteList: 'DeleteListBaoDuongById',
            insert: 'InsertBaoDuong',
            update: 'UpdateBaoDuongById'
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

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay) {
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
                    TuNgay: TuNgay,
                    DenNgay: DenNgay,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

        function GetPageDetail(BaoDuongId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    BaoDuongId: BaoDuongId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(BaoDuongId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    BaoDuongId: BaoDuongId
                })
            }

            return $http(req);
        }

        function DeleteList(BaoDuongIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    BaoDuongIds: BaoDuongIds
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
                    phieuBaoDuong: data.phieuBaoDuong,
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
                    baoDuongId: data.baoDuongId,
                    phieuBaoDuong: data.phieuBaoDuong,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId
                })
            }

            return $http(req);
        }

    }
})();