(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoCongNoNCCListCtrl', KhoCongNoNCCListCtrl)
            .directive("keyboard", keyboard)       //HOT-KEY
            .filter('sumOfValue', function () {
                return function (data, key) {
                    if (angular.isUndefined(data) || angular.isUndefined(key))
                        return 0;
                    var sum = 0;
                    angular.forEach(data, function (value) {
                        sum = sum + parseInt(value[key], 10);
                    });
                    return sum;
                };
            });
    //HOT-KEY
    function keyboard($document, keyCodes) {
        return {
            link: function (scope, element, attrs) {

                var keysToHandle = scope.$eval(attrs.keyboard);
                var keyHandlers = {};

                // Registers key handlers
                angular.forEach(keysToHandle, function (callback, keyName) {
                    var keyCode = keyCodes[keyName];
                    keyHandlers[keyCode] = { callback: callback, name: keyName };
                });

                // Bind to document keydown event
                $document.on("keydown", function (event) {

                    var keyDown = keyHandlers[event.keyCode];

                    // Handler is registered
                    if (keyDown) {
                        event.preventDefault();

                        //// Invoke the handler and digest
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY
    function KhoCongNoNCCListCtrl($rootScope, $scope, KhoCongNoNCCService, $timeout, ExcelExport) {
        /* =======================================
         * PRIVATE
         */
        var vm = this;
        $rootScope.isOpenPopup = false;
        $rootScope.IsSelectAll = false;
        $rootScope.isOpenPopupTimKiem = false;
        vm.keys = {


            //press ESC -> close popup
            ESC: function (name, code) {
                //alert("ESC");
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },
            //press F2 -> open popup
            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopupTimKiem) {
                    $('#panelTimkiemCollapse').collapse('show');
                    $rootScope.isOpenPopupTimKiem = true;
                } else {
                    $('#panelTimkiemCollapse').collapse('hide');
                    $rootScope.isOpenPopupTimKiem = false;
                }
            },

        };
        var controllerId = 'KhoCongNoNCCListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
           
            listKhoCongNoNCC: [],
            dangLamViec: '',
        };



        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            searchString: $('#tungay').val() + '|' + $('#denngay').val() + '|',
            pagesize: 10,
            isLoading: false,
            showList: false,
            UserLoginId: '',
            error: error,
            listKhoCongNoNCC: [],
            inputSearch: inputSearch,
            NgayKiemKho: '',
        };

        vm.action = {
            getPage: getPage,
            search: search,
            excel: excel,
            print: print,

        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() { }

        function search() {
            if (vm.data.showList) {
                getPage();
            } else {
                vm.data.showList = true;
            }
        }
        // nhận cấu hình từ giao diện
        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }


            if (config && config.showList) {
                vm.data.showList = config.showList;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }
            initEventListener();
        }
        function excel(tableId) {
            var exportHref = ExcelExport.tableToExcel(tableId, 'Issue');
            $timeout(function () { location.href = exportHref; }, 100);
        }

        function print(printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            var css = '<style>';
            css += 'table, td, th {border: 1px solid #ddd; text-align: left; } ';
            css += 'table { border-collapse: collapse; width: 100%;}';
            css += ' th, td { padding: 15px;}';
            css += '</style>';
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /> ' + css + '</head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        };




        function getPage(tableState) {
            vm.data.isLoading = true;
            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = vm.data.pagesize ? vm.data.pagesize : 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'A.HangHoaId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            vm.data.NgayKiemKho = searchString.split('|')[0] + ' ~ ' + searchString.split('|')[1];
            var fields = "";
            KhoCongNoNCCService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId).then(function (success) {
                if (success.data.data) {
                    vm.data.listKhoCongNoNCC = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
            });
        }




        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                vm.data.searchString = data;
               
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getKhoCongNoNCCInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }


        /* =====================================
         * Utility / Helpers
         */
        function clearArray(array) {
            while (array.length) {
                array.pop();
            }
        }



        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join('|');
            result = result || '';

            return result;
        }

        function initTableState(tableState) {
            tableState = tableState || {};

            tableState.draw = tableState.draw || 0;

            tableState.pagination = tableState.pagination || {};
            tableState.pagination.numberOfPages = tableState.pagination.numberOfPages || 0;
            tableState.pagination.start = tableState.pagination.start || 0;
            tableState.pagination.number = tableState.pagination.number || 10;

            tableState.sort = tableState.sort || {};
            tableState.sort.predicate = '';
            tableState.sort.reverse = false;

            return tableState;
        }


    }
})();
