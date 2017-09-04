(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(AccountService) {
        var vm = this;
        vm.title = 'Đăng nhập';

        vm.formLogin = {
            username: 'binhnt',
            password: '123456',
            error: null
        };

        vm.fnLogin = function () {
            var checkLogin = AccountService.login(vm.formLogin.username, vm.formLogin.password);

            if (checkLogin == false) {
                vm.formLogin.error = { code: '1', type: 'LOGIN_FAILED', message: 'Tên đăng nhập hoặc mật khẩu không đúng.' };
            }

            if (checkLogin == true) {
                vm.formLogin.error = { code: '0', type: 'LOGIN_SUCCESS', message: 'Đăng nhập thành công.' };
                location.href = 'index';
            }
        };

        activate();
        function activate() {
           console.log(angular.element($()).jquery);
        }
    }

})();
