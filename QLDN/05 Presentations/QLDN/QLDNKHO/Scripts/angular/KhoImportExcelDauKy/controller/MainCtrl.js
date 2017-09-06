(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http, ImportExcelDauKyService) {

        var vm = this;
        vm.data = {
            listQuyenTacVu: []
        };
        var kyId = 0;

        vm.onInitView = onInitView;
        activate();
        function activate() {
        }
        $scope.selectedFile = null;
        $scope.msg = "";
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }
            if (config && config.kyId) {
                kyId = config.kyId;
            }
        }
        $scope.loadFile = function (files) {

            $scope.$apply(function () {
                $scope.selectedFile = files[0];

            })

        }
        $scope.handleFile = function () {

            var file = $scope.selectedFile;

            if (file) {

                var reader = new FileReader();

                reader.onload = readSuccess;

                function readSuccess(e) {

                    var data = e.target.result;

                    var workbook = XLSX.read(data, { type: 'binary' });

                    var first_sheet_name = workbook.SheetNames[0];

                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                    if (dataObjects.length > 0 && kyId > 0) {
                        ImportExcelDauKyService.ImportData(kyId, dataObjects).then(function (success) {

                            alert('Import thành công!');

                        }, function (error) {

                            alert('Lỗi! ' + error)
                        });


                    } else {
                        alert('Lỗi! ');
                    }

                }

                reader.onerror = function (ex) {
                    console.log(ex)
                }
                console.log(reader.onerror)
                reader.readAsBinaryString(file);
            }
        }

    }
})();
