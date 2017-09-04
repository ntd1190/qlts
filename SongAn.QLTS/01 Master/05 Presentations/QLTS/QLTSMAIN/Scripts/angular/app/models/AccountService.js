(function () {
    'use strict';

    var tblAccount = [
        { Ma: 'ACC001', Username: 'binhnt', Password: '123456' },
        { Ma: 'ACC002', Username: 'admin', Password: 'admin' }
    ];
    angular
        .module('app')
        .factory('AccountService', AccountService);


    function AccountService($cookieStore) {
        var option = { path: '/' };
        var service = {
            login: login,
            logout: logout,
            getSession: getSession
        };
        return service;

        function login(username, password) {
            var account = tblAccount.find(function (account) {
                return account.Username === username;
            });

            if (account !== undefined && account.Password === password) {
                account.Password = '';
                $cookieStore.put('account', account, option);
                return true;
            }

            return false;
        };

        function logout() {
            $cookieStore.remove('account', option);
        }

        function getSession() {
            return $cookieStore.get('account', option);
        }
    }
})();