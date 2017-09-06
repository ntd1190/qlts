(function () {
    'use strict';

    var module = angular.module('upload', []);

    module.constant("apiUrl", "http://localhost/QLDNKHO/upload/Files");

    module.controller('UploadCtrl', function ($http, apiUrl, Upload) {
        var vm = this;

        vm.data = {};

        vm.action = {};
        vm.action.upload = function () {
            console.log(vm.data.file);
            if (!vm.data.file || vm.data.file.length === 0) { return; }
            var formData = new FormData();
            formData.append(vm.data.file[0].name , vm.data.file[0]);
            formData.append('fileName', vm.data.fileName + '.' + vm.data.file[0].name.split('.')[1]);

            console.log(formData);

            Upload.filesUpload(formData).then(function success(result) {
                console.log(result);
                $('#form1 input[type="file"]').val('');
            }, function error(result) {
                console.log(result);
            });
        };
    });

    module.factory('Upload', function ($http, apiUrl) {
        return {
            filesUpload: function (formData) {
                return $http({
                    headers: { 'Content-Type': undefined }, // bắt buộc dùng undefined
                    method: 'POST',
                    url: apiUrl,
                    data: formData
                })
            }
        };
    });

    module.directive("fileBind", [function () {
        return {
            scope: {
                fileBind: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    scope.$apply(function () {
                        //scope.fileread = changeEvent.target.files[0];
                        // or all selected files:
                        scope.fileBind = changeEvent.target.files;
                    });
                });
            }
        }
    }]);
})();