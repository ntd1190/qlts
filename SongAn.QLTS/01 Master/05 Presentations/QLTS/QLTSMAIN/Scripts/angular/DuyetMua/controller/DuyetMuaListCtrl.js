(function () {
    'use strict';

    angular.module("app")
        .controller("DuyetMuaListCtrl", controller)

    function controller($rootScope, $scope, DuyetMuaService, utility, $q) {
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
            //press F2 -> open popup
            F2: function (name, code) {
                if (vm.data.showButtonDuyet) {
                    window.location = '/QLTSMAIN/DuyetMua/create';
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    $("#txtsearch").focus();
                    getPage();
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
            showButtonDuyet: false,
            listQuyenTacVu: [],
            DuyetMuaList: [],
            DuyetMuaChiTietList: [],
            DuyetMuaSelected: [],
            isLoading: false,
            searchString: '',
            TongSo: 0,
            DuyetId: '0',
            RowChecked: true,
            objTuChoi: { Ngay: moment().format('DD/MM/YYYY') }
        };

        vm.action = {
            GetPageByDuyetId:GetPageByDuyetId,
            getPage: getPage,
            getPageChiTiet: getPageChiTiet,
            DongY: DongY,
            TuChoi: TuChoi,
            CheckRow: CheckRow,
            OpenTuChoi: OpenTuChoi,
            DongYChiTiet: DongYChiTiet,
            TuChoiChiTiet: TuChoiChiTiet,
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
                setEnableButton();
            }
        }
        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen duyệt
                if (vm.data.listQuyenTacVu.indexOf("A") > 0) {
                    vm.data.showButtonDuyet = true;
                }

               
            }
        }
        function eventAutoReload() {
            $scope.$on('sa.qltsmain.DuyetMua.DuyetMua.reload', function (event) {
                getPage(_tableState);
            });
        }

        function GetPageByDuyetId(DuyetId) {
            vm.data.DuyetId = DuyetId;
            getPage();
        }

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
            utility.addloadding($('body'));
            tableState.draw = tableState.draw + 1 || 1;
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'Nam';
            var sortDir = tableState.sort.reverse ? 'asc' : 'desc';
            var searchString = vm.data.searchString;
            var CoSoId = vm.data.userInfo.CoSoId;
            var NhanVienId = vm.data.userInfo.NhanVienId;
            var DuyetId = vm.data.DuyetId;
            DuyetMuaService.getPage(draw, start, number, searchString, sortName, sortDir, CoSoId, NhanVienId, DuyetId).then(function (success) {
                if (success.data.data) {
                    $('#bgloadding').remove();
                    vm.data.DuyetMuaList = success.data.data;
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
                $('#bgloadding').remove();
            });
        }
        function getPageChiTiet(MuaSamId) {
            var deferred = $q.defer();
            $('tr').removeClass('info');
            $('#row_' + MuaSamId).addClass('info');
            if (MuaSamId) {
                DuyetMuaService.getPageChiTiet(MuaSamId).then(function (success) {
                    if (success.data.data) {
                        $('#bgloadding').remove();
                        vm.data.DuyetMuaChiTietList = success.data.data;
                        vm.data.TongSo = success.data.data.length;
                    }
                    return deferred.resolve(success);
                    vm.data.isLoading = false;
                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error != null) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.data.Message);
                    }
                    $('#bgloadding').remove();
                    return deferred.reject(error);
                });
            }
            return deferred.promise;
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
        function DongY() {

            var MuaSamId = "";
            for (var i = 0; i < vm.data.DuyetMuaList.length; i++) {
                var select = vm.data.DuyetMuaList[i];
                if (select.isSelected) {
                    var MuaSamId = select.MuaSamId;
                }
            }
            if (MuaSamId == "") {
                utility.AlertError('Vui lòng chọn phiếu đề nghị trang cấp để duyệt !');
                return;
            }
            var DuyetId = 1;
            var NgayDuyet = moment().format('DD/MM/YYYY');
            var NguoiDuyet = vm.data.userInfo.NhanVienId;
            var NoiDungDuyet = "";
            utility.addloadding($('body'));
            DuyetMuaService.Duyet(MuaSamId, DuyetId, NgayDuyet, NguoiDuyet, NoiDungDuyet).then(function (success) {
                if (success.data.data) {
                    utility.AlertSuccess('Duyệt thành công');
                    $('#bgloadding').remove();
                    getPage();
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
        function OpenTuChoi() {
            var MuaSamId = "";
            for (var i = 0; i < vm.data.DuyetMuaList.length; i++) {
                var select = vm.data.DuyetMuaList[i];
                if (select.isSelected) {
                    var MuaSamId = select.MuaSamId;
                }
            }
            if (MuaSamId == "") {
                utility.AlertError('Vui lòng chọn phiếu đề nghị trang cấp để duyệt !');
                return;
            }
            else {
                $('#TuChoiPopup').collapse('show');
                $('#txtLyDo').focus();
            }
        }
        function DongYChiTiet(item) {
            utility.addloadding($('body'));
            DuyetMuaService.DuyetChiTiet(item.MuaSamId, item.MuaSamChiTietId, 1).then(function (success) {
                if (success.data.data) {
                    var DuyetId = success.data.data[0].DuyetId;
                    getPageChiTiet(item.MuaSamId).then(function (success) {
                        if (DuyetId != 0)
                            $.each(vm.data.DuyetMuaList, function (index, value) {
                                if (value.MuaSamId == item.MuaSamId) {
                                    vm.data.DuyetMuaList[index].DuyetId = DuyetId;
                                    vm.data.DuyetMuaList[index].TrangThai = DuyetId == 1 ? "Đồng ý" : "Từ chối";
                                }
                            });
                    });
                    $('#bgloadding').remove();
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
        function TuChoiChiTiet(item) {
            utility.addloadding($('body'));
            DuyetMuaService.DuyetChiTiet(item.MuaSamId, item.MuaSamChiTietId, 2).then(function (success) {
                if (success.data.data) {
                    var DuyetId = success.data.data[0].DuyetId;
                    getPageChiTiet(item.MuaSamId).then(function (success) {
                        if (DuyetId != 0)
                            $.each(vm.data.DuyetMuaList, function (index, value) {
                                if (value.MuaSamId == item.MuaSamId) {
                                    vm.data.DuyetMuaList[index].DuyetId = DuyetId;
                                    vm.data.DuyetMuaList[index].TrangThai = DuyetId == 1 ? "Đồng ý" : "Từ chối";
                                }
                            });
                    });
                    $('#bgloadding').remove();
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
        function TuChoi() {

            var MuaSamId = "";
            for (var i = 0; i < vm.data.DuyetMuaList.length; i++) {
                var select = vm.data.DuyetMuaList[i];
                if (select.isSelected) {
                    var MuaSamId = select.MuaSamId;

                }
            }
            var DuyetId = 2;
            var NgayDuyet = vm.data.objTuChoi.Ngay;
            var NguoiDuyet = vm.data.userInfo.NhanVienId;
            var NoiDungDuyet = vm.data.objTuChoi.LyDo;
            utility.addloadding($('body'));
            DuyetMuaService.Duyet(MuaSamId, DuyetId, NgayDuyet, NguoiDuyet, NoiDungDuyet).then(function (success) {
                if (success.data.data) {
                    utility.AlertSuccess('Duyệt thành công');
                    $('#bgloadding').remove();
                    $('#TuChoiPopup').collapse('hide');
                    vm.data.objTuChoi = {};
                    getPage();
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
        function CheckRow(check) {
            vm.data.RowChecked = check;
        }
        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
    

    }
})();