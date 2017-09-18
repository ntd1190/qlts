(function () {
    'use strict';

    var dsPhongBan = [
          {
              "Ma": "PB001",
              "Ten": "Phòng IT"
          },
          {
              "Ma": "PB002",
              "Ten": "Phòng kinh doanh"
          },
          {
              "Ma": "PB003",
              "Ten": "Phòng triễn khai"
          },
          {
              "Ma": "PB004",
              "Ten": "Phòng hổ trợ"
          }
    ];

    var dsSelected = [];

    angular
        .module('app')
        .factory('PhongBanService', PhongBanService);

    function PhongBanService() {
        var service = {
            getData: getData
        };

        service.getAll = function () {
            return dsPhongBan;
        }

        service.getSelected = function () {
            return dsSelected;
        };
        
        return service;

        function getData() { }
    }
})();