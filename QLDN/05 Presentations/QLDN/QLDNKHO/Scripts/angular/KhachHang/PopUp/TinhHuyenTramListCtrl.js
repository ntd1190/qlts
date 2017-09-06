(function () {
    'use strict';

    angular.module("app")
        .controller("TinhHuyenTramListCtrl", controller);

    function controller($rootScope, $scope, TinhHuyenTramService) {
        var vm = this;
        var maTinh = "";
        var maHuyen = "";
        var _tableState = {};
        vm.data = {
            TinhListDisplay: [],
            HuyenListDisplay: [],
            PhuongXaListDisplay: [],
            isLoading: false,
            searchStringTinh: '',
            searchStringHuyen: '',
            searchStringPhuongXa: ''
        };

        vm.action = {
            alert: alert,
            getPageTinh: getPageTinh,
            getPageHuyen: getPageHuyen,
            getPagePhuongXa: getPagePhuongXa,
            apDungTinh: apDungTinh,
            apDungTinhEdit:apDungTinhEdit,
            apDungHuyenEdit: apDungHuyenEdit,
            apDungPhuongXaEdit: apDungPhuongXaEdit,
        };


        activate();

        function activate() {
            eventAutoReload();
            getPageTinh();
            getPageHuyen();
            getPagePhuongXa();
        }

        function eventAutoReload() {
            $scope.$on('TinhHuyenTramListCtrl.action.clearListTinh', function (event) {
                maTinh = "";
                getPageHuyen();
            });
            $scope.$on('TinhHuyenTramListCtrl.action.clearListHuyen', function (event) {
                maHuyen = "";
                getPagePhuongXa();
            });
            $scope.$on('sa.qldnmain.tinh.tinh.reload', function (event) {
                getPageTinh(_tableState);
            });
        }

        function getPageTinh(tableState) {
            vm.data.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;

            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'TinhThanhPhoId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchStringTinh;
            var fields = 'TinhThanhPhoId,MaTT,TenTT';
            TinhHuyenTramService.getPageTinh(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    vm.data.TinhListDisplay = success.data.data;
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
            });
        }
        function getPageHuyen(tableState) {
            vm.data.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;

            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'QuanHuyenId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchStringHuyen;
            var fields = 'QuanHuyenId,MaQuanHuyen,TenQuanHuyen';
            TinhHuyenTramService.getPageHuyen(draw, start, number, searchString, sortName, sortDir, fields,maTinh).then(function (success) {
                if (success.data.data) {
                    vm.data.HuyenListDisplay = success.data.data;
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
            });
        }
        function getPagePhuongXa(tableState) {
            vm.data.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;

            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'PhuongXaId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchStringPhuongXa;
            var fields = 'PhuongXaId,MaPhuongXa,TenPhuongXa';
            TinhHuyenTramService.getPagePhuongXa(draw, start, number, searchString, sortName, sortDir, fields,maHuyen).then(function (success) {
                if (success.data.data) {
                    vm.data.PhuongXaListDisplay = success.data.data;
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
            });
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
        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function apDungTinh() {
            var selectedList = new Array();
            var TinhListDisplay = vm.data.TinhListDisplay;
            for (var i = 0; i < TinhListDisplay.length; i++) {
                if (TinhListDisplay[i].isSelected) {
                    selectedList.push(TinhListDisplay[i]);
                }
            }
            
            $scope.$emit('TinhListPopup.action.ap-dung', selectedList);
        }
        function apDungTinhEdit() {
            var selectedList = new Array();
            var TinhListDisplay = vm.data.TinhListDisplay;
            for (var i = 0; i < TinhListDisplay.length; i++) {
                if (TinhListDisplay[i].isSelected) {
                    selectedList.push(TinhListDisplay[i]);
                }
            }
            console.log(selectedList);
            maTinh = selectedList[0].MaTT;
            getPageHuyen();
            $scope.$emit('TinhListPopupEdit.action.ap-dung', selectedList);
        }
        function apDungHuyenEdit() {
            var selectedList = new Array();
            var HuyenListDisplay = vm.data.HuyenListDisplay;
            for (var i = 0; i < HuyenListDisplay.length; i++) {
                if (HuyenListDisplay[i].isSelected) {
                    selectedList.push(HuyenListDisplay[i]);
                }
            }
            console.log(selectedList);
            maHuyen = selectedList[0].MaQuanHuyen;
            getPagePhuongXa();
            $scope.$emit('HuyenListPopupEdit.action.ap-dung', selectedList);
        }
        function apDungPhuongXaEdit() {
            var selectedList = new Array();
            var PhuongXaListDisplay = vm.data.PhuongXaListDisplay;
            for (var i = 0; i < PhuongXaListDisplay.length; i++) {
                if (PhuongXaListDisplay[i].isSelected) {
                    selectedList.push(PhuongXaListDisplay[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit('PhuongXaListPopupEdit.action.ap-dung', selectedList);
        }
    }
})();