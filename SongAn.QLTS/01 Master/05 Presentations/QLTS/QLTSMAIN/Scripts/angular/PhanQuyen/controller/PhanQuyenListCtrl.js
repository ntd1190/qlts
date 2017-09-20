(function () {
    'use strict';

    angular.module('app')
           .controller('PhanQuyenListCtrl', PhanQuyenListCtrl)

    function PhanQuyenListCtrl($scope, $rootScope, PhanQuyenService, API_BASE) {
        var vm = this;
        vm.data = {
            listVaiTro: [],
            VaiTroId: '',
            listQuyenTacVu: [],
            UserLoginId:'',
        }
        vm.action = {
            clearListVaiTro: clearListVaiTro
        }
        activate();
        vm.onInitView = onInitView;
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }
        }
        function activate() {
            window.API_BASE = API_BASE;
            initEventListener();
        }
        function initEventListener() {
            
            $scope.$on('VaiTroListCtrl.action.ap-dung', function (event, data) {
                vm.data.listVaiTro = data;
                vm.data.VaiTroId = data[0].VaiTroId;
                getPage(vm.data.VaiTroId,'1');
                $('#VaiTroListPopup').collapse('hide');
            });
        }
        function getPage(id,loai) {
            PhanQuyenService.getById(id,loai).then(function (result) {
                if (result.data) {
                    var dsChucNang = "";
                    var dsQuyen = "";
                    var MenuList = result.data.data;
                    var SuperLevel = jQuery.grep(MenuList, function (n) {
                        return (n.SuperLevel);
                    });
                    for (var i = 0; i < SuperLevel.length; i++) {
                        var menu = SuperLevel[i];
                        
                        dsChucNang = dsChucNang + "<li>";
                        dsChucNang = dsChucNang + "<label class='tree-toggle nav-header glyphicon-icon-rpad'>";
                        dsChucNang = dsChucNang + "<i class='" + menu.Icon + " fa-fw' aria-hidden='true'></i>"+ menu.TenChucNang ;
                        dsChucNang = dsChucNang + "<span class='menu-collapsible-icon glyphicon glyphicon-chevron-down'></span>";
                        dsChucNang = dsChucNang + "</label>";
                        dsChucNang = dsChucNang + "<ul class='nav nav-list tree bullets'>";
                        for (var l = 0; l < MenuList.length; l++) {
                            var item = MenuList[l];
                            if (item.MidLevel == menu.SuperLevel) {
                              
                                var chucnang = item.DSQuyen? item.DSQuyen.split(",") : "";
                                var qtacvu = item.DSQuyenTacVu ? item.DSQuyenTacVu.split(","):"";
                                var dscn = "";
                                for (var u = 0; u < chucnang.length;u++) {
                                    var check = "";
                                    for (var k = 0; k < qtacvu.length; k++) {
                                        if (chucnang[u] == qtacvu[k]) check = "checked";
                                    }
                                    dscn += "<label class='radio-inline'><input  type='checkbox' " + check + " onclick='UpdateQuyen($(this),&#39;" + item.DSQuyen + "&#39;,&#39;" + item.ChucNangId + "&#39;," + vm.data.VaiTroId + ")' value='" + chucnang[u] + "' />" + (chucnang[u] == "V" ? "Xem" : chucnang[u] == "N" ? "Mới" : chucnang[u] == "D" ? "Xóa" : chucnang[u] == "M" ? "Sửa" : chucnang[u] == "A" ? "Duyệt" : chucnang[u] == "VR" ? "Xem phòng" : chucnang[u] == "VB" ? "Xem cơ sở" : chucnang[u] == "VA" ? "Xem tất cả" : chucnang[u]) + "</label>";
                                }
                                dsChucNang = dsChucNang + "<li>";
                                dsChucNang = dsChucNang + "<span class='col-sm-4'>" + item.TenChucNang + "</span>";
                                dsChucNang = dsChucNang + "<span class='col-sm-8' data-Quyen='" + item.DSQuyenTacVu + "'>" + dscn + "</span>";
                                dsChucNang = dsChucNang + "</li>";

                            }
                        }
                        dsChucNang = dsChucNang + " </ul>";
                        dsChucNang = dsChucNang + "</li>";
                       
                    }
                    $('#DSChucNang').html(dsChucNang);
                    $('.tree-toggle').click(function () {
                        $(this).parent().children('ul.tree').toggle(200);
                    });
                }

            });
        }
        function clearListVaiTro() {
            vm.data.listVaiTro = [];
            $('#DSChucNang').html('');
            $('#DSQuyen').html('');

        }

    }
})();