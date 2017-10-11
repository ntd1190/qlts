(function () {
    'use strict';

    angular
        .module('app')
        .factory('DuyetBaoCaoService', DuyetBaoCaoService);

    function DuyetBaoCaoService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLTS/DuyetBaoCao/',
            GetPage: 'GetListDuyetBaoCaoByProjection',
            GetPageDetail: 'GetListDuyetBaoCaoChiTietById',
            Duyet: 'DuyetDuyetBaoCao',
            DuyetChiTiet: 'DuyetDuyetBaoCaoChiTiet'
        }

        var service = {
            DuyetChiTiet:DuyetChiTiet,
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

        function GetPageDetail(LapBaoCaoId) {
            var url = api.url + api.GetPageDetail;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    LapBaoCaoId: LapBaoCaoId
                })
            }

            return $http(req);
        }


        function Duyet(LapBaoCaoId, DuyetId, NgayDuyet, NguoiDuyet, NoiDungDuyet) {
            var url = api.url + api.Duyet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    LapBaoCaoId: LapBaoCaoId,
                    DuyetId: DuyetId,
                    NgayDuyet: NgayDuyet,
                    NguoiDuyet: NguoiDuyet,
                    NoiDungDuyet: NoiDungDuyet
                })
            }

            return $http(req);
        }
        function DuyetChiTiet(LapBaoCaoId, LapBaoCaoChiTietId, NgayDuyet, NoiDungDuyet, DuyetId) {
            var url = api.url + api.DuyetChiTiet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    LapBaoCaoId: LapBaoCaoId,
                    LapBaoCaoChiTietId: LapBaoCaoChiTietId,
                    NgayDuyet: NgayDuyet,
                    NoiDungDuyet: NoiDungDuyet,
                    DuyetId: DuyetId
                   
                })
            }

            return $http(req);
        }
    }
})();