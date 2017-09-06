(function () {
    'use strict';

    angular.module('app')
        .controller('ChucNangEditCtrl', controller);

    function controller($rootScope, $scope, ChucNangService) {
        var chucNangId = 0;

        var vm = this;

        vm.status = {
            isLoading: false
        };

        vm.data = {
            objChucNang: {},
            isEdit: false
        };

        vm.action = {
            save:save,
            refresh: refresh
        };

        vm.validate = {
            MaChucNang: '',
            TenChucNang: ''
        }

        activate();

        function activate() {
            $('#ChucNangEditPopup').on('hidden.bs.collapse', function () {
                chucNangId = 0;
                getById(chucNangId);
            });

            $scope.$on('ChucNangEditCtrl.chucNangId', function (event, data) {
                chucNangId = data;
                refresh();
            });
        }

        function save() {
            console.log(vm.data.objChucNang);
            if (vm.data.objChucNang.ChucNangId > 0) {
                edit();
            } else {
                add();
            }
        }

        function edit() {
            if (validate()) { return; }

            vm.status.isLoading = true;
            ChucNangService.update(vm.data.objChucNang).then(function (success) {
                if (success.data.data) {
                    vm.data.objChucNang = success.data.data;
                }
                vm.status.isLoading = false;
                $('#ChucNangEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.chucnang.list.reload');
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
            });
        }

        function add() {
            if (validate()) { return; }

            vm.status.isLoading = true;
            ChucNangService.insert(vm.data.objChucNang).then(function (success) {
                if (success.data.result) {
                    chucNangId = success.data.ChucNangId;
                }
                vm.status.isLoading = false;
                $('#ChucNangEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.chucnang.list.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
            getById(chucNangId);
            vm.validate.MaChucNang = '';
            vm.validate.TenChucNang = '';
        }

        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                ChucNangService.getById(id).then(function (success) {
                    console.log(success);
                    if (success.data) {
                        vm.data.objChucNang = success.data.data;
                    }
                vm.status.isLoading = false;
                });
            } else {
                vm.data.objChucNang = {};
            }
        }

        function validate() {
            var hasError = false;

            vm.validate.MaChucNang = '';
            vm.validate.TenChucNang = '';

            if (!vm.data.objChucNang.MaChucNang || vm.data.objChucNang.MaChucNang == '') {
                hasError = true;
                vm.validate.MaChucNang = 'Chưa nhập mã chức năng';
            }

            if (!vm.data.objChucNang.TenChucNang || vm.data.objChucNang.TenChucNang == '') {
                hasError = true;
                vm.validate.TenChucNang = 'Chua nhập tên chức năng';
            }

            return hasError;
        }
    }
})();