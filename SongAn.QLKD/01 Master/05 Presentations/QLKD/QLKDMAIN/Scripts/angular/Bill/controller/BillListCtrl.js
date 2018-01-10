(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'billList',
            url: '/bill/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: BillListCtrl
        });
    });

    function BillListCtrl($stateParams, SETTING, $q, utility, BillService, Upload) {
        var userInfo, _tableState;

        var BillId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };

        vm.error = {};
        vm.data = {};
        vm.inputSearch = {};

        vm.data.listCot = [
            { MaCot: 'SoBill', TenCot: 'Số bill', HienThiYN: true, DoRong: 90 },
            { MaCot: 'NoiDung', TenCot: 'Nội dung', HienThiYN: true, DoRong: 300 },
            { MaCot: 'TenNguoiGui', TenCot: 'Người gửi', HienThiYN: true, DoRong: 100 },
            { MaCot: 'NguoiNhan', TenCot: 'Người nhận', HienThiYN: true, DoRong: 200 },
            { MaCot: 'SDT', TenCot: 'Số điện thoại', HienThiYN: true, DoRong: 200 },
            { MaCot: 'DiaChiNhan', TenCot: 'Địa chỉ nhận', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayGui', TenCot: 'Ngày gửi', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NguoiNhanThucTe', TenCot: 'Người nhận thực tế', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayNhanThucTe', TenCot: 'Ngày nhận thực tế', HienThiYN: true, DoRong: 200 },
            { MaCot: 'HinhAnh', TenCot: 'Hình ảnh bill', HienThiYN: true, DoRong: 200 },
        ];

        /* INIT / EVENT FUNCTION */

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};

            initEventListener();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'Bill/showView?viewName=list';
        }

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {
                    vm.action.edit(0);
                }
            },
            F3: function (name, code) {
                console.log('F3');
                vm.action.search();
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.status.isOpenPopup
                    && (vm.action.checkQuyenTacVuEdit('N') || vm.action.checkQuyenTacVuEdit('M'))) {
                    vm.action.save();
                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            },
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
                } else {
                    $(document).find('input[autofocus]').focus();
                }
            },
        };

        function initEventListener() {
            $(document).ready(function () { // #DiaBanEditPopup
                $('#BillEditPopup').on('hidden.bs.collapse', function () {
                    vm.status.isOpenPopup = false;
                    resetPopup();
                    $("#BillList input[autofocus]").focus();
                });
                $('#BillEditPopup').on('shown.bs.collapse', function () {
                    vm.status.isOpenPopup = true;
                    $("#BillEditPopup input[autofocus]").focus();
                });
            });
        }


        activate();
        function activate() { }

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.getPage = function (tableState) {
            vm.status.isLoading = true;
            getPage(tableState).then(function (success) {
                vm.status.isSelectedAll = false;
                vm.status.isLoading = false;
            }, function (error) {
                vm.status.isLoading = false;
            });
        }
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        vm.action.edit = function (id) {
            resetPopup();
            BillId = id || 0;
            if (BillId > 0) {
                getById(BillId);
            }
            else {
                vm.data.Bill.NgayGui = moment().format('DD/MM/YYYY');
                vm.data.Bill.NgayNhanThucTe = moment().format('DD/MM/YYYY');
            }
            $('#BillEditPopup').collapse('show');
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (BillId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            if (vm.action.checkQuyenTacVuEdit('N') == false && vm.action.checkQuyenTacVuEdit('M') == false) { return; }
            if (checkInput() == false) { return; }
            if (!CompareDate(vm.data.Bill.NgayGui, vm.data.Bill.NgayNhanThucTe)) {
                utility.AlertError('Ngày nhận hàng không hợp lệ!');
                return;
            }

            if (vm.data.Bill.file && vm.data.Bill.file.length > 0) {
                if (vm.data.Bill.HinhAnh) {
                    vm.data.Bill.HinhAnh = vm.data.Bill.HinhAnh.split('.')[0] + '.' + utility.getFileExt(vm.data.Bill.file[0].name);
                } else {
                    vm.data.Bill.HinhAnh = 'FC' + moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.Bill.file[0].name);
                }
            }

            if (BillId > 0) {
                $q.all([update(), UploadFile()]).then(function (success) {
                    
                    vm.action.search();
                    utility.AlertSuccess('Cập nhật thành công');
                    $('#BillEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                $q.all([insert(), UploadFile()]).then(function (success) {
                    
                    vm.action.search();
                    utility.AlertSuccess('Thêm thành công');
                    $('#BillEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }
        vm.action.deleteList = function () {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var BillSelected = new Array();

            for (var i = 0; i < vm.data.listBill.length; i++) {
                var Bill = vm.data.listBill[i];
                if (Bill.isSelected) {
                    BillSelected.push(Bill.BillId);
                }
            }
            var ids = BillSelected.join(',');
            if (ids.length == 0) {
                utility.AlertError("Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.");
                return;
            }
            BillService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                utility.AlertSuccess('Xóa thành công!');
            }, function (error) {
                vm.data.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
        }

        vm.action.keyPress = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listBill, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listBill);
        };

        vm.action.refresh = function () {
            vm.action.edit(BillId);
        }

        /* BIZ FUNCTION */
        function CompareDate(dateOne, dateTwo) {
            if (dateOne === "" || dateTwo === "")
                return false;
            var strOne = dateOne.split("/");
            var strTwo = dateTwo.split("/");
            dateOne = new Date(strOne[2], strOne[1], strOne[0]);
            dateTwo = new Date(strTwo[2], strTwo[1], strTwo[0]);

            if (dateOne > dateTwo) {
                return false;
            } else {
                return true;
            }
        }

        function resetPopup() {
            BillId = 0;
            delete vm.data.Bill; vm.data.Bill = {};
            delete vm.error; vm.error = {};
        }

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'Bill';
            var prop_name = '';
            var error_name = '';

            prop_name = 'SoBill';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'NoiDung';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'NguoiGui';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        /* API FUNCTION */
        function UploadFile() {
            console.log('UploadFile');
            var deferred = $q.defer();


            if (angular.isUndefined(vm.data.Bill.file) || vm.data.Bill.file.length == 0) {
                return deferred.resolve('');
            }
            Upload.filesUpload(vm.data.Bill.file, vm.data.Bill.HinhAnh, 'Bill/').then(function (success) {
                console.log('Upload.filesUpload.success', success);
                vm.data.Bill.HinhAnh = success.data.data;
                $('input[type=file]').val('');
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function insert() {
            var deferred = $q.defer();

            vm.data.Bill.NguoiTao = userInfo.NhanVienId;
            var Bill = utility.clone(vm.data.Bill);
            var data = {};
            data.Bill = angular.toJson(Bill);
            data.UserId = userInfo.UserId;

            BillService.insert(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });
            return deferred.promise;
        }

        function update() {
            var deferred = $q.defer();

            vm.data.Bill.NguoiTao = userInfo.NhanVienId;
            var Bill = utility.clone(vm.data.Bill);
            var data = {};
            data.BillId = BillId;
            data.Bill = angular.toJson(Bill);
            data.UserId = userInfo.UserId;

            BillService.update(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });
            return deferred.promise;
        }

        function getById(id) {
            var deferred = $q.defer();

            BillService.getById(id).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.Bill = success.data.data[0];
                } else {
                    delete vm.data.Bill;
                    vm.data.Bill = {};
                }
                return deferred.resolve(success);
            }, function (error) {
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });
            return deferred.promise;
        }

        function getPage(tableState) {
            var deferred = $q.defer();

            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = utility.initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;


            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'BillId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.inputSearch.search || '';
            var fields = "";

            BillService.getPage(draw, start, number, searchString, sortName, sortDir, fields, userInfo.UserId, userInfo.NhanVienId).then(function (success) {
                //console.log(success);
                if (success.data.data) {
                    vm.data.listBill = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / tableState.pagination.number);
                }
                return deferred.resolve(success);
            }, function (error) {
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });

            return deferred.promise;
        }
    }

})();