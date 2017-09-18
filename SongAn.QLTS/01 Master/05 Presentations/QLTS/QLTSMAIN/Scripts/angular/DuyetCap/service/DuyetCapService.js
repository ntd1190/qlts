(function () {
    'use strict';

    angular
        .module('app')
        .factory('DuyetCapService', DuyetCapService);

    function DuyetCapService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/DuyetCap/',
            GetPage: 'GetListDuyetCapByProjection',
            GetPageDetail: 'GetListDuyetCapChiTietByDeNghiId',
            Duyet: 'DuyetDuyetCap'
        }

        var service = {
            Duyet: Duyet,
            getPage: getPage,
            GetPageDetail: GetPageDetail,

        };

        return service;

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, PhongBanId, SoPhieu, DuyetId) {
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
                    NhanVienId: NhanVienId,
                    DuyetId: DuyetId
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


        function Duyet(DeNghiId, DuyetId, NgayDuyet, NguoiDuyet, NoiDungDuyet) {
            var url = api.url + api.Duyet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    DeNghiId: DeNghiId,
                    DuyetId: DuyetId,
                    NgayDuyet: NgayDuyet,
                    NguoiDuyet: NguoiDuyet,
                    NoiDungDuyet: NoiDungDuyet
                })
            }

            return $http(req);
        }
      
    }
})();