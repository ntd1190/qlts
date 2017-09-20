(function () {
    'use strict';

    angular
        .module('app')
        .factory('DuyetMuaService', DuyetMuaService);

    function DuyetMuaService($http, API_BASE) {
    var api = {
        url: API_BASE+'Api.QLTS/DuyetMua/',

        GetPage: 'GetListDuyetMuaByProjection',
        getPageChiTiet: 'GetDuyetMuaChiTietByMuaSamId',
        Duyet: 'DuyetDuyetMua',
        DuyetChiTiet: 'DuyetDuyetMuaChiTiet'
    }

    var service = {
            getPageChiTiet:getPageChiTiet,
            Duyet : Duyet,
            getPage: getPage,
            DuyetChiTiet: DuyetChiTiet
        };

        return service;



        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, DuyetId) {
            var url =api.url + api.GetPage;

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
                    NhanVienId: NhanVienId,
                    DuyetId: DuyetId
                })
            }

            return $http(req);
        }
        function getPageChiTiet(MuaSamId) {
            var url = api.url + api.getPageChiTiet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    MuaSamId: MuaSamId
                })
            }

            return $http(req);
        }
        function Duyet(MuaSamId, DuyetId, NgayDuyet, NguoiDuyet, NoiDungDuyet) {
            var url = api.url + api.Duyet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    MuaSamId: MuaSamId,
                    DuyetId: DuyetId,
                    NgayDuyet: NgayDuyet,
                    NguoiDuyet: NguoiDuyet,
                    NoiDungDuyet: NoiDungDuyet
                })
            }

            return $http(req);
        }
        function DuyetChiTiet(MuaSamId, MuaSamChiTietId, DuyetId) {
            var url = api.url + api.DuyetChiTiet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    MuaSamId: MuaSamId,
                    MuaSamChiTietId: MuaSamChiTietId,
                    DuyetId: DuyetId,

                })
            }

            return $http(req);
        }
       

       

    }
})();