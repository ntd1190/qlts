(function () {
    'use strict';

    angular.module("app")
        .controller("GiayBaoHongListCtrl", controller)
        .directive("keyboard", keyboard);        //HOT-KEY

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

    function controller($rootScope, $scope, GiayBaoHongService, TuyChonCotService) {
        var vm = this;

        $rootScope.isOpenPopupTimKiem = false;
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {

            },
            //press F2 -> open popup
            F2: function (name, code) {
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    window.location.href = vm.data.linkUrl + 'GiayBaoHong/edit?id=0';
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopupTimKiem) {
                    $('#SearchCollapse').collapse('show');
                    $rootScope.isOpenPopupTimKiem = true;
                } else {
                    $('#SearchCollapse').collapse('hide');
                    $rootScope.isOpenPopupTimKiem = false;
                }
            },

            ////press F8 -> search
            //F8: function (name, code) {
            //    if (!$rootScope.isOpenPopup) {
            //        return;
            //    }
            //}
        };
        //end HOT-KEY
        var _tableState = {};
        vm.data = {
            userInfo: {},
            showButtonNew: false,
            showButtonXoaChon: false,
            showButtonDuyet: false,
            listQuyenTacVu: [],
            GiayBaoHongListDisplay: [],
            GiayBaoHongChiTietListDisplay: [],
            GiayBaoHongSelected: [],
            isLoading: false,
            TongSo: 0,
            searchString: '',
            PhongBanIds: '',
            TuNgay: '',
            DenNgay: '',
            linkUrl: '',
            listCot: []
        };

        vm.action = {
            getPage: getPage,
            getPageDetail: getPageDetail,
            deleteSelected: deleteSelected,
            loadCotList: loadCotList,
            checkCot: checkCot
        };


        activate();
        vm.onInitView = onInitView;
        function activate() {
            eventAutoReload();
            loadCotList();
        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
                setEnableButton();
                loadCotList();
            }

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }
            catchTuyChonCotPopupEvent();
        }
        function loadCotList() {
            if (1 === 1) {
                TuyChonCotService.getAll('FL0031', vm.data.userInfo.UserId).then(function (success) {
                    if (success.data && success.data.data) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
        }
        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonDuyet = true;
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
            $scope.$on('sa.qltsmain.GiayBaoHong.GiayBaoHong.reload', function (event) {
                getPage(_tableState);
            });

            $scope.$on('GiayBaoHongListCtrl.action.get-filter', function (event, data) {
                vm.data.PhongBanIds = data.boPhanId;
                vm.data.TuNgay = data.startDate;
                vm.data.DenNgay = data.endDate;
                getPage(_tableState);
            });


        }
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $rootScope.$on('TuyChonCotPopup' + '.action.ap-dung', function (event, data) {
                $('#' + 'TuyChonCotPopup').collapse('hide');
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $(document).ready(function () {
                $('#' + 'TuyChonCotPopup').on('show.bs.collapse', function () {
                    $rootScope.$broadcast('TuyChonCotPopup' + '.action.refresh');
                });
            });
        }

        // kiểm tra ẩn hiện cột
        function checkCot(cot) {
            if (!cot.HienThiYN || cot.HienThiYN == false) {
                return false;
            }

            switch (cot.MaCot) {
                case 'CtrVersion': return false;
                default: return true;
            }
        }

        function addloadding(obj) {
            $(obj).append('<div id="bgloadding"><div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div></div>');
        }
        function removeloadding(obj) {
            $('#bgloadding').remove();
        }


        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các phiếu đã chọn?')) {
                return;
            }

            vm.data.isLoading = true;

            var GiayBaoHongListSelected = new Array();

            for (var i = 0; i < vm.data.GiayBaoHongListDisplay.length; i++) {
                var select = vm.data.GiayBaoHongListDisplay[i];
                if (select.isSelected) {
                    GiayBaoHongListSelected.push(select.GiayBaoHongId);
                }
            }
            var ids = GiayBaoHongListSelected.join(',');
            if (ids.length > 0) {
                GiayBaoHongService.DeleteList(ids).then(function (success) {
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

        function getPage(tableState) {
            if (vm.data.TuNgay === '') {
                vm.data.TuNgay = $('#tungay').val();
                vm.data.DenNgay = $('#denngay').val();
            }
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
            addloadding($('body'));
            tableState.draw = tableState.draw + 1 || 1;
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'GiayBaoHongId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var CoSoId = vm.data.userInfo.CoSoId;
            var NhanVienId = vm.data.userInfo.NhanVienId;
            var TuNgay = vm.data.TuNgay;
            var DenNgay = vm.data.DenNgay;
            var PhongBanId = vm.data.PhongBanIds;
            var SoChungTu = "";

            GiayBaoHongService.getPage(draw, start, number, searchString, sortName, sortDir, CoSoId, NhanVienId, TuNgay, DenNgay, PhongBanId, SoChungTu).then(function (success) {
                if (success.data.data) {
                    $('#bgloadding').remove();
                    vm.data.GiayBaoHongListDisplay = success.data.data;
                    vm.data.GiayBaoHongChiTietListDisplay = [];
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
            loadCotList();
        }

        function getPageDetail(GiayBaoHongId) {
            $('tr').removeClass('info');
            $('#row_' + GiayBaoHongId).addClass('info');
            if (GiayBaoHongId && GiayBaoHongId > 0) {
                GiayBaoHongService.GetPageDetail(GiayBaoHongId).then(function (success) {
                    if (success.data.data) {
                        $('#bgloadding').remove();
                        vm.data.GiayBaoHongChiTietListDisplay = success.data.data;
                        vm.data.TongSo = success.data.data.length;
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


    }
})();