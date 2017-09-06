(function () {
    'use strict';


    angular
        .module('app')
        .factory('KhoTonKhoService', KhoTonKhoService);


    function KhoTonKhoService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKho/KhoTonKho/',
            GetFilter: 'GetListKhoTonKhoByCriteria',
            updateTrangThai: 'UpdateTrangThaiKhoTonKho',
            GetListChiTietById: 'GetListKhoTonKhoChiTietByTonKhoId',
            updateTonDau: 'UpdateTonDauKhoTonKhoChiTiet',
            insert: 'InsertTonDauHangHoa'
        }

        var service = {
            getFilter: getFilter,
            updateTrangThai: updateTrangThai,
            GetListChiTietById: GetListChiTietById,
            updateTonDau: updateTonDau,
            insert: insert
        };

        return service;


        function getFilter(data) {
            var url = api.url + api.GetFilter;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: data.draw,
                    start: data.start,
                    length: data.length,
                    sortName: data.sortName,
                    sortDir: data.sortDir,
                    TuNgay: data.TuNgay,
                    DenNgay: data.DenNgay,
                    KhoHangId : data.KhoHangId,
                    LoginId: data.LoginId
                })
            }

            return $http(req);
        }

        function GetListChiTietById(data) {
            var url = api.url + api.GetListChiTietById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: data.draw,
                    start: data.start,
                    length: data.length,
                    sortName: data.sortName,
                    sortDir: data.sortDir,
                    TonKhoId: data.TonKhoId
                })
            }

            return $http(req);
        }

        function updateTrangThai(data) {
            var url = api.url + api.updateTrangThai;

            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: { TonKhoId: data.TonKhoId, LoginId: data.LoginId }
            }

            return $http(req);
        }

        function updateTonDau(data) {
            var url = api.url + api.updateTonDau;

            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: {
                    TonKhoId: data.TonKhoId
                    , TonKhoChiTietId: data.TonKhoChiTietId
                    , TonDau: data.TonDau
                    , GiaNhap: data.GiaNhap
                    , LoHang: data.LoHang
                    , LoginId: data.LoginId
                }
            }

            return $http(req);
        }

        function insert(data) {
            var url = api.url + api.insert;

            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: {
                    TonKhoId: data.TonKhoId
                    , MaHangHoa: data.MaHangHoa
                    , TenHangHoa: data.TenHangHoa
                    , DonViTinh: data.DonViTinh
                    , LoHang : data.LoHang
                    , TonDau: data.TonDau
                    , GiaNhap:data.GiaMua
                    , LoginId: data.LoginId
                }
            }

            return $http(req);
        }
    }
})();