(function () {
    'use strict';

    var module = angular.module('app');

    module.factory('Upload', function ($http, SETTING) {
        var service = {};

        service.filesUpload = function (file, fileName, path) {

            var data = new FormData();
            data.append(file[0].name, file[0]);
            data.append('fileName', fileName);
            data.append('path', path);

            return $http({
                headers: { 'Content-Type': undefined }, // bắt buộc dùng undefined
                method: 'POST',
                url: SETTING.HOME_URL + 'upload/files',
                data: data
            })
        };

        return service;
    });

})();