(function () {
    'use strict';

    angular
        .module('app')
        .factory('dialogMessage', service)
        .directive('dialogMessage', dialogMessage);

    dialogMessage.$inject = ['$window'];

    function dialogMessage() {
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: '/QLTSMAIN/scripts/angular/shared/dialog-message/template/dialog-message.template.html',
            scope: {
                idName: '@'
            },
            controller: controller
        };
        return directive;

        function link($scope, element, attrs, $ctrl, dialogMessage) {
            dialogMessage.settings.idName = $scope.idName;
            console.log($scope);
            $('#dialogmessage').on('show.bs.modal', function (e) {
                console.log($scope);
                $scope.title = dialogMessage.settings.title;
                $scope.message = dialogMessage.settings.message;
            });
        }

    }


    function service() {
        var title = 'title';
        var message = 'message';
        var settings = {
            idName: '',
            title: title,
            message: message,
            type: 'alert'
        };

        return {
            settings: settings,
            alert: alert,
            confirm: confirm
        }

        function alert(title, message, callback) {
            settings.title = title;
            settings.message = message;
            $('#' + settings.idName).modal();
        }

        function confirm() {
        }
    }
})();