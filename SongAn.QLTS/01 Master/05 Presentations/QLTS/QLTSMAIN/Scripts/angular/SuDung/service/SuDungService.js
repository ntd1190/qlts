(function () {
    'use strict';

    angular
        .module('app')
        .factory('SuDungService', SuDungService);

    function SuDungService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/SuDung/',
            GetPage: 'GetListSuDungByProjection',
            GetPageDetail: 'GetListSuDungChiTietBySuDungId',
            GetPageHeaderById: 'GetListSuDungById',
            DeleteList: 'DeleteListSuDungById',
            insert: 'InsertSuDung',
            update: 'UpdateSuDungById'
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

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, KyLap) {
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
                    NhanVienId: NhanVienId,
                    KyLap: KyLap
                })
            }

            return $http(req);
        }

        function GetPageDetail(SuDungId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    SuDungId: SuDungId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(SuDungId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    SuDungId: SuDungId
                })
            }

            return $http(req);
        }

        function DeleteList(SuDungIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    SuDungIds: SuDungIds
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
                    phieuSuDung: data.phieuSuDung,
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
                    SuDungId: data.SuDungId,
                    phieuSuDung: data.phieuSuDung,
                    listChiTiet: data.listChiTiet,
                    loginId: data.loginId
                })
            }

            return $http(req);
        }

    }
})();