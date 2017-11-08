(function () {
    angular.module('app')
        .controller('NguoiDungCtrl', NguoiDungCtrl);

    function NguoiDungCtrl($scope, NguoiDungService) {
        var vm = this;
        vm.data = {
            dsNguoiDung: []
        };

        vm.action = {
            getAll: getAll,
            find: find
        };

        activate();

        function activate() {
        }

        function getAll() {
            NguoiDungService.getAll().then(function (result) {
                console.log(result);
                if (result.data)
                    vm.data.dsNguoiDung = result.data;
            });
        }

        function find(text) {
            NguoiDungService.findAll(text).then(function (result) {
                console.log(result);
                if (result.data)
                    vm.data.dsNguoiDung = result.data;
            });
        }
    }
})();