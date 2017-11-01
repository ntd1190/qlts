(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhaiThacService', KhaiThacService);

    function KhaiThacService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/KhaiThac/',
            insert: 'InsertKhaiThac',
            update: 'UpdateKhaiThacById',
            GetPage: 'GetListKhaiThacByProjection',
            GetById: 'GetListKhaiThacById',
            removeList: 'DeleteListKhaiThacById',
        }

        var service = {
            GetPage: GetPage,
            GetById: GetById,
            insert: insert,
            update: update,
            removeList: removeList,
        };

        return service;

        function removeList(ids) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ids: ids
                })
            }

            return $http(req);
        }

        function GetPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, SoPhieu) {
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
                })
            }

            return $http(req);
        }

        function insert(obj) {
            if (!obj) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    TaiSanId: obj.TaiSanId,
                    PhongBanId: obj.PhongBanId,
                    NhanVienIdKT: obj.NhanVienIdKT,
                    KhachHangNCCId: obj.KhachHangNCCId,
                    SoChungTu: obj.SoChungTu,
                    SoLuongKhaiThac: obj.SoLuongKhaiThac,
                    DonGiaKhaiThac: obj.DonGiaKhaiThac,
                    ThoiGianBatDau: obj.ThoiGianBatDau,
                    ThoiGianKetThuc: obj.ThoiGianKetThuc,
                    TienThu: obj.TienThu,
                    NopNganSach: obj.NopNganSach,
                    DonVi:obj.DonVi,
                    GhiChu: obj.GhiChu,
                    CoSoId: obj.CoSoId,
                    NhanVienId: obj.NguoiTao,
                    HopDongId:obj.HopDongId
                })
            }
            return $http(req);
        }

        function update(obj, obj_old) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhaiThacId: obj.KhaiThacId,
                    TaiSanId: obj.TaiSanId,
                    PhongBanId: obj.PhongBanId,
                    NhanVienIdKT: obj.NhanVienIdKT,
                    KhachHangNCCId: obj.KhachHangNCCId,
                    SoChungTu: obj.SoChungTu,
                    SoLuongKhaiThac: obj.SoLuongKhaiThac,
                    DonGiaKhaiThac: obj.DonGiaKhaiThac,
                    ThoiGianBatDau: obj.ThoiGianBatDau,
                    ThoiGianKetThuc: obj.ThoiGianKetThuc,
                    TienThu: obj.TienThu,
                    NopNganSach: obj.NopNganSach,
                    DonVi: obj.DonVi,
                    GhiChu: obj.GhiChu,
                    CtrVersion: obj.CtrVersion,
                    HopDongId: obj.HopDongId
                })
            }
            return $http(req);
        }

        function GetById(data) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhaiThacId: data.KhaiThacId
                })
            }
            return $http(req);
        };
    }
})();