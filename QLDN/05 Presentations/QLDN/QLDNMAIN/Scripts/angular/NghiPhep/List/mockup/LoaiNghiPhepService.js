(function () {
    'use strict';


    angular
        .module('app')
        .factory('LoaiNghiPhepService', LoaiNghiPhepService);


    function LoaiNghiPhepService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLNS/LoaiNghiPhep/',
            GetFilter: 'GetAllLoaiNghiPhep',
            GetById: 'GetLoaiNghiPhepById',
            GetByMaLoaiNghiPhep: 'GetLoaiNghiPhepByMaLoaiNghiPhep',
        }

        var service = {
            GetByMaLoaiNghiPhep: GetByMaLoaiNghiPhep,
            getFilter: getFilter,
            getById: getById,
        };

        return service;


        function getFilter(draw, start, length, searchString, sortName, sortDir, fields

            ) {
            var url = api.url + api.GetFilter;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    sortName: sortName,
                    sortDir: sortDir,
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
                data: $.param({ id: id })
            }
            return $http(req);
        };

        function GetByMaLoaiNghiPhep(maloainghiphep) {
            var url = api.url + api.GetByMaLoaiNghiPhep;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ MaLoaiNghiPhep: maloainghiphep })
            }
            return $http(req);
        };
    }
})();