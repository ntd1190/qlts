(function () {
    'use strict';


    angular
        .module('app')
        .factory('BangLuongCaNhanService', BangLuongCaNhanService);


    function BangLuongCaNhanService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLNS/BangLuongCaNhan/',
            GetFilter: 'GetListBangLuongCaNhanByCriteria',
            Calculate: 'CalculateBangLuongCaNhanByCriteria',

        }

        var service = {
            getFilter: getFilter,
            calculate: calculate,
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
                    BANGLUONG_ID: data.BangLuongId,
                    NHANVIEN_ID: data.NhanVienIds,
                    MA_TRANG_THAI: data.MaTrangThai,
                    NGAY_BAT_DAU: data.NgayBatDau,
                    NGAY_KET_THUC: data.NgayKetThuc,
                    XOA_YN: data.XoaYN,
                })
            }

            return $http(req);
        }

        function calculate(data) {
            var url = api.url + api.Calculate;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    BANGLUONG_ID: data.BangLuongId,
                    NGUOITAO_ID: data.NguoiTaoId,
                    NHANVIEN_IDS: data.NhanVienIds,
                })
            }

            return $http(req);
        }
    }
})();