(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'phanQuyenList',
            url: '/phanquyen/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: phanQuyenListCtrl
        });
    });

    function phanQuyenListCtrl($stateParams, SETTING, $scope, $rootScope, PhanQuyenService, API_BASE, $q) {
        var vm = this;
        vm.data = {
            listVaiTro: [],
            VaiTroId: '',
            listQuyenTacVu: [],
            UserLoginId: '',
        }
        vm.action = {
            clearListVaiTro: clearListVaiTro,
            getListChucNangByVaiTroId: getListChucNangByVaiTroId,
            UpdateQuyen: UpdateQuyen
        }
        activate();
        vm.onInitView = onInitView;
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'phanquyen/showView?viewName=list';
        }

        function activate() {
            window.API_BASE = API_BASE;
            initEventListener();
        }
        function initEventListener() {

            
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
                            dschucnang += "<label class='radio-inline'><input  type='checkbox' " + check + " ng-click='ctrl.action.UpdateQuyen($(this),&#39;" + item.DSQuyen + "&#39;,&#39;" + item.ChucNangId + "&#39;," + vm.data.VaiTroId + ")' value='" + chucnang[j] + "' />" + (chucnang[j] == "V" ? "Xem" : chucnang[j] == "N" ? "Mới" : chucnang[j] == "D" ? "Xóa" : chucnang[j] == "M" ? "Sửa" : chucnang[j] == "A" ? "Duyệt" : chucnang[j] == "L" ? "Sổ cái" : chucnang[j]) + "</label>"
                        }
                        tbody += "<td data-Quyen='" + item.DSQuyenTacVu + "' >" + dschucnang + "</td>";
                        tbody += "</tr>";
                    }
                    $("#tbdata").html(tbody);

                }

            });
        }

        function getListChucNangByVaiTroId(data) {
            //vm.data.listVaiTro = data;
            vm.data.VaiTroId = data.VaiTroId;
            getPage(vm.data.VaiTroId, '1');
        }

        function clearListVaiTro() {
            vm.data.listVaiTro = [];
            $("#tbdata").html('');

        }

        function UpdateQuyen(check, DSQuyen, ChucNangId, VaiTroId) {
            var dsQuyenTacVu = "";
            var chucNang = "";
            var DSQuyenTacVu = $(check).parent().parent().data('quyen');
            addloadding($('body'));
            var quyen = "";
            if ((dsQuyenTacVu == "" && DSQuyenTacVu) || (chucNang != ChucNangId && DSQuyenTacVu)) dsQuyenTacVu = DSQuyenTacVu;
            var arrDSQuyen = DSQuyen.split(",");
            dsQuyenTacVu = $(check).is(":checked") ? dsQuyenTacVu + "," + $(check).val() : dsQuyenTacVu.replace($(check).val(), "");
            var arrDSQuyenTacVu = dsQuyenTacVu.split(",");
            for (var j = 0; j < arrDSQuyen.length; j++)
                for (var k = 0; k < arrDSQuyenTacVu.length; k++) {
                    if (arrDSQuyenTacVu[k] == arrDSQuyen[j])
                        quyen = quyen + arrDSQuyen[j] + ",";
                }
            $(check).parent().parent().data('quyen', quyen);
            dsQuyenTacVu = quyen;
            chucNang = ChucNangId;
            $.ajax({
                type: "POST",
                url: window.API_BASE + 'api.QLKD/QuyenTacVu/UpdateQuyenTacVu',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    VaiTroId: VaiTroId,
                    ChucNangId: ChucNangId,
                    DSQuyenTacVu: quyen.substring(0, quyen.length - 1),
                }), error: function (msg) {
                    console.log(msg)
                },
                success: function (msg) {
                    if (msg.data.ChucNangId > 0) removeloadding($('body'));
                }
            });
        }
        function addloadding(obj) {
            $(obj).append('<div id="bgloadding"><div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div></div>');
        }
        function removeloadding(obj) {
            $('#bgloadding').remove();
        }

    }
})();