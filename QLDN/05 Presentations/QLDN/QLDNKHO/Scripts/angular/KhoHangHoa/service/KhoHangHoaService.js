(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoHangHoaService', KhoHangHoaService);

    function KhoHangHoaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/KhoHangHoa/',
            insert: 'InsertKhoHangHoa',
            update: 'UpdateKhoHangHoa',
            GetList: 'GetListKhoHangHoa',
            GetPage: 'GetListKhoHangHoaByProjection',
            GetPageKho: 'GetListKhoKhoHangByCriteria',
            GetById: 'GetKhoHangHoaById',
            GetListBySearchString: 'GetListKhoHangHoaBySearchString',
            getList: 'getList',
            getListCount: 'getListCount',
            getListProjection: 'getListProjection',
            remove: 'DeleteKhoHangHoa',
            removeList: 'UpdateXoaListKhoHangHoa',
            removeListV2: 'UpdateXoaListKhoHangHoaV2',
            getThongTinByMa: 'GetThongTinKhoHangHoaByMa',
        }

        var service = {
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            removeListV2: removeListV2,
            getListLuocSu: getListLuocSu,
            GetPageKho: GetPageKho,
            getThongTinByMa: getThongTinByMa
        };

        return service;

        function removeList(data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                data: { congViec: angular.toJson(data) }
            }

            return $http(req);
        }

        // 2017.07.24 binhnt # update xóa dùng stored kiểm tra ràng buộc khóa ngoại
        function removeListV2(data, loginId) {
            var url = api.url + api.removeListV2;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                data: {
                    listHangHoa: angular.toJson(data),
                    loginId: loginId
                }
            }

            return $http(req);
        }

        function getPage(draw, start, length, searchString, sortName, sortDir, fields, LoginId) {
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
                    fields: fields,
                    LoginId: LoginId
                })
            }

            return $http(req);
        }
        function GetPageKho(data) {
            var url = API_BASE + 'api.QLNS/KhoKhoHang/' + api.GetPageKho;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
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
                data: $.param(obj)
            }
            return $http(req);
        }

        function update(obj) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }
            return $http(req);
        }

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KhoHangHoaId: id })
            }
            return $http(req);
        };

        function getList (draw, start, length, searchString, sortName, sortDir, fields,LoginId,loai,khoId,leftjoinHH) {
            var url = api.url + api.GetListBySearchString;

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
                    fields: fields,
                    LoginId: LoginId,
                    loai: loai,
                    khoId: khoId,
                    leftjoinHH: leftjoinHH
                })
            }

            return $http(req);
        }
        function getListLuocSu(draw, start, length, searchString, sortName, sortDir, fields) {
            var url = API_BASE + 'api.QLNS/KhoLuocSu/GetListKhoLuocSuByCriteria';
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
                    fields: fields,
                })
            }

            return $http(req);
        }
        function getThongTinByMa(MaHangHoa) {
            var url = api.url + api.getThongTinByMa;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ MaHangHoa: MaHangHoa })
            }
            return $http(req);
        }
    }
})();