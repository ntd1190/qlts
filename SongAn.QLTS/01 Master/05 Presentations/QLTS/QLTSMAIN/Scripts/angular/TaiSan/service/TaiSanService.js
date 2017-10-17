(function () {
    'use strict';
    var module = angular.module('app');

    module.service('TaiSanService', function ($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/TaiSan/',
            insert: 'InsertTaiSan',
            update: 'UpdateTaiSan',
            getById: 'GetTaiSanById',
            getPage: 'GetListTaiSanByCriteria',
            removeList: 'DeleteListTaiSan',
            getListNguyenGiaByTaiSanId: 'getListNguyenGiaByTaiSanId',
            GetCombobox: 'GetListcbxTaiSanByCriteria',
            getComboboxSuDung: 'GetListcbxTaiSanSuDungByCriteria',
            getComboboxSuDungById: 'GetListcbxTaiSanSuDungById',
            GetMaTaiSan: 'GetTaiSanByMa',

            getTTCKById: 'GetThongTinCongKhaiById',

            getTTKK_DatById: 'GetThongTinKeKhaiDatById',
            getTTKK_NhaById: 'GetThongTinKeKhaiNhaById',
            getTTKK_OtoById: 'GetThongTinKeKhaiOtoById',
            getTTKK_500ById: 'GetThongTinKeKhai500ById',

            checkMaTaiSan: 'CheckMaTaiSan',
        }
        var service = {};
        service.insert = function (data) {
            var url = api.url + api.insert;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.update = function (data) {
            var url = api.url + api.update;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.removeList = function (data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.getById = function (data) {
            var url = api.url + api.getById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.getPage = function (data) {
            var url = api.url + api.getPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.getListNguyenGiaByTaiSanId = function (data) {
            var url = api.url + api.getListNguyenGiaByTaiSanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.getCombobox = function (data) {
            var url = api.url + api.GetCombobox;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        }
        service.getComboboxSuDung = function (CoSoId, NhanVienId, Search, MaTaiSan, TaiSanId, FunctionCode) {
            var url = api.url + api.getComboboxSuDung;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    MaTaiSan: MaTaiSan,
                    TaiSanId: TaiSanId,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
        service.getComboboxSuDungById = function (CoSoId, TaiSanId, PhongBanId, NhanVienId, FunctionCode) {
            var url = api.url + api.getComboboxSuDungById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    CoSoId: CoSoId,
                    TaiSanId: TaiSanId,
                    PhongBanId: PhongBanId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
        service.GetMaTaiSan = function (data) {
            var url = api.url + api.GetMaTaiSan;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        /*** THÔNG TIN CÔNG KHAI ***/
        service.getTTCKById = function (data) {
            var url = api.url + api.getTTCKById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        /*** THÔNG TIN KÊ KHAI ***/
        service.getTTKK_DatById = function (data) {
            var url = api.url + api.getTTKK_DatById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        service.getTTKK_NhaById = function (data) {
            var url = api.url + api.getTTKK_NhaById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        service.getTTKK_OtoById = function (data) {
            var url = api.url + api.getTTKK_OtoById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        service.getTTKK_500ById = function (data) {
            var url = api.url + api.getTTKK_500ById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        service.checkMaTaiSan = function (data) {
            var url = api.url + api.checkMaTaiSan;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        return service;
    });

})();