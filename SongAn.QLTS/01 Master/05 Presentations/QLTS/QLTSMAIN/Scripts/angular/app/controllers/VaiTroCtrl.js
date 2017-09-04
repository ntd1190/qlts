(function () {
    angular.module('app')
        .controller('VaiTroCtrl', VaiTroCtrl);

    function VaiTroCtrl($scope, $rootScope, VaiTroService) {
        var vm = this;
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false
        };

        vm.data = {
            dsVaiTro: [],
            objVaiTro: {}
        };

        vm.action = {
            add: add,
            resetEdit: resetEdit,
            update: update,
            getAll: getAll,
            find: find,
            getById: getById,
            insert: insert,
            remove: remove,
            edit: edit,
        };

        $scope.$watch('VaiTroId', function () {
            getById($rootScope.VaiTroId);
        });

        $rootScope.$on('vaitroctrl.list.refresh', function (event) {
            find($scope.search);
        });

        activate();

        function activate() { }

        function edit(id) {
            $rootScope.VaiTroId = id;
        }
        function add() {
        }

        function resetEdit(id) {
            getById(id);
        };

        function getById(id) {
            vm.status.isLoadingEdit = true;

            vm.data.objVaiTro = {};

            if (id && id > 0) {
                VaiTroService.getById(id).then(function (result) {
                    console.log(result);
                    if (result.data) {
                        vm.data.objVaiTro = result.data;
                    } else {
                        vm.data.objVaiTro = {};
                    }
                    vm.status.isLoadingEdit = false;
                }, function (error) { vm.status.isLoadingEdit = false; });
            }
        }

        function insert(obj) {
            VaiTroService.insert(obj).then(function (result) {
                console.log(result);
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                    $rootScope.$emit('vaitroctrl.list.refresh');
                }
            }, function (error) {
                console.log(error);
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        function update(obj) {
            console.log(obj);
            VaiTroService.update(obj).then(function (result) {
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                    $rootScope.$emit('vaitroctrl.list.refresh');
                }
            });
        }

        function remove(id) {
            if (confirm('Bạn có muốn xóa?')) {
                VaiTroService.remove(id).then(function (result) {
                    if (result.data) {
                        find($scope.search);
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        }

        function getAll() {
            VaiTroService.getAll().then(function (result) {
                if (result.data)
                    vm.data.dsVaiTro = result.data;
            });
        }

        function find(text) {
            vm.status.isLoadingList = true;
            VaiTroService.findAll(text).then(function (result) {
                console.log(result);
                if (result.data) {
                    vm.data.dsVaiTro = result.data;
                }
                vm.status.isLoadingList = false;
            }, function (error) {
                console.log(error);
            });
        }
    }
})();