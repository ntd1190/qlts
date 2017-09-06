(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl(AccountService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'ProfileCtrl';
        vm.Account = {};

        vm.logout = function () {
            AccountService.logout();
            checkLogin();
        }

        activate();

        function activate() {
            checkLogin();
        }
        function checkLogin() {
            vm.Account = AccountService.getSession();
            if (!vm.Account) {
                window.location.href = 'Index?view=login';
            }
        }
    }
})();
