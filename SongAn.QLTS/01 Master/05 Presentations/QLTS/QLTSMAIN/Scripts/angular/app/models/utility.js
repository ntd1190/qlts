(function () {
    'use strict';

    angular
        .module('app')
        .factory('utility', utility);


    function utility() {
        var service = {
            clearArray: clearArray,
            clone: cloneObject,
            getQueryString: getParameterByName,
            setQueryString: updateQueryStringParameter,
            checkInValid: checkInValid,
            joinStr: joinStr,
            convertDateFormat: convertDateFormat,
            AlertSuccess: AlertSuccess,
            AlertError: AlertError,
            addloadding: addloadding,
            removeloadding: removeloadding,
            initTableState: initTableState,
        };

        return service;

        function initTableState(tableState) {
            tableState = tableState || {};

            tableState.draw = tableState.draw || 0;

            tableState.pagination = tableState.pagination || {};
            tableState.pagination.numberOfPages = tableState.pagination.numberOfPages || 0;
            tableState.pagination.start = tableState.pagination.start || 0;
            tableState.pagination.number = tableState.pagination.number || 10;

            tableState.search = tableState.search || {};
            tableState.search.predicateObject = tableState.search.predicateObject || {};

            tableState.sort = tableState.sort || {};
            tableState.sort.predicate = '';
            tableState.sort.reverse = false;

            return tableState;
        }

        function checkInValid(value, type) {
            switch (type) {
                case 'isCode':
                    var pattern = /^[a-zA-Z0-9- ]*$/;
                    if (value == 'undefined' || value == null || value == '' || pattern.test(value) == false)
                        return true;
                    break;

                case 'isEmpty': if (value == undefined || value == null || value == '')
                    return true;
                    break;

                case 'isNumber':
                    var pattern = /^-?\d+\.?\d*$/;///^[0-9- ]*$/;
                    if (value == 'undefined' || value == null || value == '' || pattern.test(value) == false)
                        return true;
                    break;
                case 'Email':
                    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                    if (value == 'undefined' || value == null || value == '' || pattern.test(value) == false)
                        return true;
                    break;
            }
            return false;
        }

        function joinStr(array, property, separator) {
            separator = separator || '|';
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join(separator);
            result = result || '';

            return result;
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }

        function convertDateFormat(strDate, formatInput, formatOutput) {
            var result = moment(strDate, formatInput).format(formatOutput);
            result = result == 'Invalid date' ? '' : result;
            return result;
        }

        // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
        function cloneObject(obj) {
            return JSON.parse(JSON.stringify(obj));
        }

        // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
        function updateQueryStringParameter(key, value, uri) {
            if (!uri) {
                uri = window.location.href;
            }
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            }
            else {
                return uri + separator + key + "=" + value;
            }
        }

        /*** thông báo lỗi ***/

        function AlertSuccess(message) {
            var dom = '<div class="top-alert"><div class="alert alert-success alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-ok"></i> ' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>';
            var jdom = $(dom);
            jdom.hide();
            $("body").append(jdom);
            jdom.fadeIn();
            setTimeout(function () {
                jdom.fadeOut(function () {
                    jdom.remove();
                });
            }, 2000);

        }
        function AlertError(message) {
            var dom = '<div class="top-alert"><div class="alert alert-warning alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-question-sign"></i> ' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>';
            var jdom = $(dom);
            jdom.hide();
            $("body").append(jdom);
            jdom.fadeIn();
            setTimeout(function () {
                jdom.fadeOut(function () {
                    jdom.remove();
                });
            }, 2000);
        }

        function addloadding(obj) {
            $(obj).append('<div id="bgloadding"><div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div></div>');
        }
        function removeloadding(obj) {
            $('#bgloadding').remove();
        }
    }
})();