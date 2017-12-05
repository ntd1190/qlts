(function () {
    'use strict';

    angular
        .module('app', [
        'ui.router',
        'smart-table', 'angular.filter',
        'ngSanitize', 'ui.select'
        ])
        .value('API_BASE', 'http://localhost/QLKDapi/')
        .value('SETTING', {
            DEBUG: true,
            HOME_URL: 'http://localhost/QLKDMAIN/'
        })
        .run(run)
        .config(config)
        .config(function ($urlRouterProvider, $stateProvider, $urlMatcherFactoryProvider) {
            $urlMatcherFactoryProvider.caseInsensitive(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider.state({
                name: 'Home',
                url: '/',
                template: ''
            });
        });

    function run($http, SETTING) {
        initJqueryPlugin();
        authorizeHeader($http);

        if (SETTING.DEBUG == false) {
            console.log = function () { };
        }
    }

    function config(stConfig) {
        stConfig.pipe.delay = 0;
    }

    function authorizeHeader($http) {
        var token = 'abcd';
        $http.defaults.headers.post.Authorization = 'Bearer ' + token;
    }

    function initJqueryPlugin() {
        $(document).ready(function () {
            $('#side-menu').metisMenu();
            setUpMonthPicker();
        });
    }

    function setUpMonthPicker() {
        $('.input-month-year').mask('00/0000', { placeholder: "__/____" });
    }
})();