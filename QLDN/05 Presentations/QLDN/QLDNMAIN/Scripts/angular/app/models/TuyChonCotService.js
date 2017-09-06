(function () {
    'use strict';
    var tblTuyChonCot = [
          { ma_cot: 'Ma', ten_cot: 'Mã NV abc', chon: true },
          { ma_cot: 'Ten', ten_cot: 'Tên NV', chon: true },
          { ma_cot: 'PhongBan', ten_cot: 'Phòng ban', chon: true },
          { ma_cot: 'NgaySinh', ten_cot: 'Ngày sinh', chon: false },
          { ma_cot: 'NgayTuyenDung', ten_cot: 'Ngày tuyển dụng', chon: false },
          { ma_cot: 'Email', ten_cot: 'Email', chon: false },
          { ma_cot: 'DiDong', ten_cot: 'Di động', chon: false }
    ];

    angular
        .module('app')
        .factory('TuyChonCotService', TuyChonCotService);

    function TuyChonCotService(utility) {
        var service = {
            getData: getData
        };

        service.getAll = function () {
            // tblTuyChonCot= database.tuycotcot.tolist();
            return tblTuyChonCot;
        }

        return service;

        function getData() { }
    }
})();