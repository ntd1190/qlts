(function () {
    'use strict';

    angular
    .module('app')
    .factory('TuyChonCotService', TuyChonCotService);

    function TuyChonCotService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.main/cauhinhformcot/',
            getListCot: 'GetListCauHinhCotByCriteria',
            getPage: 'GetListCauHinhCotByCriteria',
        }

        var service = {
            getListCot: getListCot,
            getPage: getPage
        }

        return service;

        function getListCot(maForm) {
            var url = api.url + api.getListCot;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    maForm: maForm,
                    sortname:'ThuTu',
                    sortdir:'asc',
                })
            }

            return $http(req);

        }

        function getPage(draw, start, length, maForm) {
            var url = api.url + api.getListCot;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    maForm: maForm,
                    draw: draw,
                    start: start,
                    length: length,
                    sortName: 'ThuTu',
                    sortDir: 'asc',
                })
            }

            return $http(req);
        }
    }
})();