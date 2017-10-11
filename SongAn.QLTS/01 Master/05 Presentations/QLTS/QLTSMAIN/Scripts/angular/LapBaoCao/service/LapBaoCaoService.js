(function () {
    'use strict';

    angular
        .module('app')
        .factory('LapBaoCaoService', LapBaoCaoService);

    function LapBaoCaoService($http, API_BASE) {
    var api = {
        url: API_BASE+'Api.QLTS/LapBaoCao/',
        insert: 'InsertLapBaoCao',
        update: 'UpdateLapBaoCao',
        GetList: 'GetListLapBaoCao',
        GetPage: 'GetListLapBaoCaoByProjection',
        GetCombobox: 'GetListcbxLapBaoCaoByProjection',
        GetComboboxById: 'GetListcbxLapBaoCaoById',
        GetById: 'GetLapBaoCaoById',
        GetListBySearchString: 'GetListLapBaoCaoBySearchString',
        getList: 'getList',
        getListCount: 'getListCount',
        getListProjection: 'getListProjection',
        remove: 'DeleteLapBaoCao',
        removeList: 'DeleteListLapBaoCao',
        GuiCapTren: 'GuiCapTren',
        GetPageDetail: 'GetLapBaoCaoChiTietById',
        GetListBaoCao: 'GetListDMBaoCao'
    }

    var service = {
        getCombobox: getCombobox,
        getComboboxById: getComboboxById,
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            GetPageDetail: GetPageDetail,
            GetListBaoCao: GetListBaoCao,
            GuiCapTren:GuiCapTren
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
        function GuiCapTren(ids)
        {
            var url = api.url + api.GuiCapTren;

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
        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId) {
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
        function getComboboxById(CoSoId, NhanVienId, Search,LapBaoCaoId) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId,
                    LapBaoCaoId:LapBaoCaoId
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
                    LapBaoCao: data.LapBaoCao,
                    BaoCao: data.BaoCao,
                    NguoiTao: data.NguoiTao
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
                    LapBaoCao: data.LapBaoCao,
                    BaoCao: data.BaoCao,
                    NguoiTao: data.NguoiTao
                })
            }
            return $http(req);
        }

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ LapBaoCaoid: id })
            }
            return $http(req);
        };
        function GetPageDetail(id)
        {
            var url = api.url + api.GetPageDetail;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ LapBaoCaoid: id })
            }
            return $http(req);
        }
        
        function getList() {
            var url = api.url + api.GetListBySearchString;

            var req = {
                url: url,
                method: 'GET'
            }

            return $http(req);
        }
        function GetListBaoCao(CoSoId,NhanVienId) {
            var url = api.url + api.GetListBaoCao;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ CoSoId: CoSoId, NhanVienId: NhanVienId })
            }
            return $http(req);
        }
    }
})();