(function () {
    'use strict';
    angular.module('app')
        .factory('BaoHiemXaHoiService', service);

    function service($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLNS/baohiemxahoi/',
            UpdateBHXH: 'UpdateBaoHiemXaHoi',
            GetBHXHByNhanVienId: 'GetBaoHiemXaHoiByNhanVienId',
        }

        return {
            updateBHXH: function (data) {
                var url = api.url + api.UpdateBHXH;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            getBHXHByNhanVienId: function (data) {
                var url = api.url + api.GetBHXHByNhanVienId;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            getListLuocSu: function (draw, start, length, searchString, sortName, sortDir, fields) {
                var url = API_BASE + 'api.QLNS/LuocSu/GetListLuocSuByCriteria';
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
            },
        };

    }
})();