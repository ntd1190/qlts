(function () {
    'use strict';

    angular
        .module('app')
        .factory('DenNghiTrangCapService', DenNghiTrangCapService);

    function DenNghiTrangCapService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/DeNghiTrangCap/',
            GetPage: 'GetListDeNghiTrangCapByProjection',
            GetPageDetail: 'GetListDeNghiTrangCapChiTietByDeNghiId',
            GetPageHeaderById: 'GetListDeNghiTrangCapByDeNghiId',
            DeleteList: 'DeleteListDeNghiMuaSamById',
            insert: 'InsertDeNghiTrangCap',
            update: 'UpdateDeNghiTrangCap',
            GetPageTongHopById: 'GetTongHopDeNghiTrangCapByDeNghiId'
        }

        var service = {
            getCombobox: getCombobox,
            getPage: getPage,
            GetPageDetail: GetPageDetail,
            GetPageHeaderById: GetPageHeaderById,
            DeleteList: DeleteList,
            insert: insert,
            update: update,
            GetPageTongHopById: GetPageTongHopById
        };

        return service;

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, PhongBanId,SoPhieu) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw ,
                    start: start ,
                    length: length,
                    search: searchString,
                    sortName: sortName,
                    sortDir: sortDir,
                    CoSoId: CoSoId,
                    SoPhieu: SoPhieu,
                    TuNgay: TuNgay,
                    DenNgay: DenNgay,
                    PhongBanId : PhongBanId,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

        function GetPageDetail(DeNghiId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DeNghiId: DeNghiId
                })
            }

            return $http(req);
        }

        function GetPageHeaderById(DeNghiId) {
            var url = api.url + api.GetPageHeaderById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DeNghiId: DeNghiId
                })
            }

            return $http(req);
        }
        function GetPageTongHopById(DeNghiId) {
            var url = api.url + api.GetPageTongHopById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DeNghiId: DeNghiId
                })
            }

            return $http(req);
        }
        function DeleteList(DeNghiIds) {
            var url = api.url + api.DeleteList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DeNghiIds: DeNghiIds
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
                    phieuDeNghi: data.phieuDeNghi,
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
                    deNghiId: data.deNghiId,
                    phieuDeNghi: data.phieuDeNghi,
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