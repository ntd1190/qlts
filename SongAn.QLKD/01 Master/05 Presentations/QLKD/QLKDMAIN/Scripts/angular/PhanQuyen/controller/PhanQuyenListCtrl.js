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
            UserLoginId: '',
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
                getPage(vm.data.VaiTroId, '1');
                $('#VaiTroListPopup').collapse('hide');
            });
        }
        function getPage(id, loai) {
            PhanQuyenService.getById(id, loai).then(function (result) {
                if (result.data) {
                    var tbody = "";

                    for (var i = 0; i < result.data.data.length; i++) {
                        var item = result.data.data[i];
                        tbody += "<tr>";
                        tbody += "<td class='text-center'>" + (i + 1) + "</td>";
                        tbody += "<td>" + item.MaChucNang + "</td>";
                        tbody += "<td>" + item.TenChucNang + "</td>";
                        var chucnang = item.DSQuyen ? item.DSQuyen.split(",") : "";
                        var qtacvu = item.DSQuyenTacVu ? item.DSQuyenTacVu.split(",") : "";
                        var dschucnang = "";
                        for (var j = 0; j < chucnang.length; j++) {
                            var check = "";
                            for (var k = 0; k < qtacvu.length; k++) {
                                if (chucnang[j] == qtacvu[k]) check = "checked";
                            }
                            dschucnang += "<label class='radio-inline'><input  type='checkbox' " + check + " onclick='UpdateQuyen($(this),&#39;" + item.DSQuyen + "&#39;,&#39;" + item.ChucNangId + "&#39;," + vm.data.VaiTroId + ")' value='" + chucnang[j] + "' />" + (chucnang[j] == "V" ? "Xem" : chucnang[j] == "N" ? "Mới" : chucnang[j] == "D" ? "Xóa" : chucnang[j] == "M" ? "Sửa" : chucnang[j] == "A" ? "Duyệt" : chucnang[j] == "L" ? "Sổ cái" : chucnang[j]) + "</label>"
                        }
                        tbody += "<td data-Quyen='" + item.DSQuyenTacVu + "' >" + dschucnang + "</td>";
                        tbody += "</tr>";
                    }
                    $("#tbdata").html(tbody);

                }

            });
        }
        function clearListVaiTro() {
            vm.data.listVaiTro = [];
            $("#tbdata").html('');

        }

    }
})();