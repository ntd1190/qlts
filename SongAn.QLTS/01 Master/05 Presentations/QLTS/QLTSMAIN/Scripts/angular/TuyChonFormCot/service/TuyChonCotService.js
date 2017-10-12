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
            saveListCot: 'UpdateListCauHinhCot',
        }

        var service = {
            getAll: getAll,
            saveListCot: saveListCot,
            getPage: getPage
        }

        return service;

        // lưu danh sách cột đã thay đổi
        function saveListCot(data, userId) {
            var url = api.url + api.saveListCot;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: { listCot: angular.toJson(data), userId: userId }
            }

            return $http(req);
        }

        // lấy tất cả các cột của form, dùng cho form hiển thị dữ liệu (VD: danh sách nhân viên)
        function getAll(maForm, userId) {
            var url = api.url + api.getListCot;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    maForm: maForm,
                    userId: userId,
                    sortname:'ThuTu',
                    sortdir:'asc',
                })
            }

            return $http(req);

        }

        // lấy danh sách cột có phân trang, dùng cho form tùy chọn cột (popup tùy chọn cột)
        function getPage(draw, start, length, maForm) {
            var url = api.url + api.getPage;

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