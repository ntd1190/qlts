(function () {
    'use strict';

    angular.module("app")
        .controller("CauHinhHeThongListCtrl", controller)

    function controller($rootScope, $scope, CauHinhHeThongService, utility) {
        var vm = this;
        //HOT-KEY       
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
       

            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    return;
                }
            }
        };
        //end HOT-KEY
        var _tableState = {};
        vm.data = {
            userInfo: {},
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            CauHinhHeThongList: [],
            CauHinhHeThongSelected: [],
            isLoading: false,
            UserLoginId: '',
            CoSoId: '',
        };
        vm.action = {
            save: save,
            getPage: getPage,
            deleteSelected: deleteSelected,
            refresh: refresh,
        };
        activate();
        vm.onInitView = onInitView;
        function activate() {
            eventAutoReload();
        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                vm.data.CoSoId = config.userInfo.CoSoId;
                setEnableButton();
                getPage();
            }
        }
        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoaChon = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {

                }
            }
        }
        function eventAutoReload() {
            $scope.$on('sa.qltsmain.CauHinhHeThong.CauHinhHeThong.reload', function (event) {
                getPage(_tableState);
            });
        }
        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var CauHinhHeThongSelected = new Array();

            for (var i = 0; i < vm.data.CauHinhHeThongList.length; i++) {
                var CauHinhHeThong = vm.data.CauHinhHeThongList[i];
                if (CauHinhHeThong.isSelected) {
                    CauHinhHeThongSelected.push(CauHinhHeThong.CauHinhHeThongId);
                }
            }
            var ids = CauHinhHeThongSelected.join(',');
            if (ids.length > 0) {
                CauHinhHeThongService.remove(ids).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!')
                }, function (error) {
                    vm.data.isLoading = false;
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }



        }
        function getPage() {
            utility.addloadding($('body'));
            var NhanVienId = vm.data.userInfo.NhanVienId;
            CauHinhHeThongService.getPage(NhanVienId).then(function (success) {
                if (success.data.data) {
                    $('#bgloadding').remove();
                    vm.data.CauHinhHeThongList = success.data.data;
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);
                }
                $('#bgloadding').remove();
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
        function save() {
            var objCauHinhHeThong = utility.clone(vm.data.CauHinhHeThongList);
            var data = {};
            data.CauHinhHeThong = angular.toJson(objCauHinhHeThong);
            data.NhanVienId = vm.data.UserLoginId;
            CauHinhHeThongService.update(data).then(function (success) {
                if (success.data.data) {
                    vm.data.CauHinhHeThongList = success.data.data;
                    utility.AlertSuccess('Cập nhật thành công!');
                }

            }, function (error) {
                vm.status.isLoading = false;
            });
        }
        function refresh() {
            getPage();
        }
    
        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
    }
})();