(function () {
    var module = angular.module('app');

    module.controller('TraCuuTaiSanCtrl', function (TraCuuTaiSanService, TaiSanService, $q, $timeout, utility) {
        var vm = this
        , userInfo;

        vm.cache = {};
        vm.cache.tableState = utility.initTableState(vm.cache.tableState);

        vm.status = {};
        vm.inputSearch = {};
        vm.data = {};
        vm.data.timeline = {};
        vm.data.menuCoSo = [];
        vm.data.menuSelect = {};
        vm.data.ListTaiSan = [];
        vm.data.listNguyenGia = [];
        vm.data.TaiSan = {};
        vm.data.ListCotTaiSan = [
            { MaCot: 'TenTaiSan', TenCot: 'Tên tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenNhanVien', TenCot: 'Tên nhân viên', HienThiYN: true, DoRong: 200 },
            { MaCot: 'TenPhongBan', TenCot: 'Tên phòng ban', HienThiYN: true, DoRong: 150 },
            { MaCot: 'TenCoSo', TenCot: 'Tên cơ sở', HienThiYN: true, DoRong: 200 },
            { MaCot: 'LoaiKeKhai', TenCot: 'Loại kê khai', HienThiYN: true, DoRong: 125 },
        ];
        vm.data.ListLoaiKeKhai = [
            { LoaiKeKhai: 1, NoiDung: 'Đất' },
            { LoaiKeKhai: 2, NoiDung: 'Nhà' },
            { LoaiKeKhai: 3, NoiDung: 'Ô tô' },
            { LoaiKeKhai: 4, NoiDung: 'Tài sản trên 500 triệu' },
            { LoaiKeKhai: 0, NoiDung: 'Không kê khai' },
        ];

        /*** INIT FUNCTION ***/
        activate();
        function activate() {
        }

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};
            loadCoSo();
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPageTaiSan = getPageTaiSan;
        vm.action.loadCoSo = loadCoSo;

        vm.action.SelectedLoaiKeKhai = function () {
            var loaiIds = [];
            for (var index in vm.data.ListLoaiKeKhai) {
                if (vm.data.ListLoaiKeKhai[index].checked) {
                    loaiIds.push(vm.data.ListLoaiKeKhai[index]);
                }
            }
            vm.inputSearch.LoaiKeKhai = utility.joinStr(loaiIds, 'LoaiKeKhai', '|');
            vm.action.search();
        }
        vm.action.selectedTaiSan = function (taisan) {
            console.log(taisan);

            getTaiSanById(taisan.ID).then(function (success) {
                tinhHaoMon();
                getListNguyenGia(vm.data.TaiSan.TaiSanId);
                loadThongTinKeKhai(vm.data.TaiSan);
            });
        }

        vm.action.menuSelect = function (menu) {
            vm.data.menuSelect = menu;

            vm.inputSearch.PhongBanId = 0;
            vm.inputSearch.CoSoId = 0;
            if (menu.TYPE == 'PHONGBAN') {
                vm.inputSearch.PhongBanId = menu.ID;
                vm.inputSearch.CoSoId = menu.TRUCTHUOC;
            } else {
                vm.inputSearch.CoSoId = menu.ID;
            }
            vm.action.search();
        }
        vm.action.search = function () {
            vm.status.isLoading = true;
            vm.cache.tableState.pagination.start = 0;
            getPageTaiSan(vm.cache.tableState).then(function (success) {
                vm.status.isLoading = false;
            }, function (error) {
                vm.status.isLoading = false;
            });
        }

        vm.action.xemLuocSu = function (row) {
            vm.data.timeline.NhanVienId = row.NhanVienId;
            vm.data.timeline.PhongBanId = row.PhongBanId;
            vm.data.timeline.TaiSanId = row.ID;
            $('#timeline').collapse("show");
        }

        /*** BIZ FUNCTION ***/

        function loadCoSo() {
            getMenu().then(function (success) {
                vm.data.menuCoSo = list_to_tree(vm.data.menuCoSo);
                setupNavTree();
            });
        }

        function tinhHaoMon() {
            vm.data.TaiSan.NguyenGia = vm.data.TaiSan.NguyenGia | 0;
            vm.data.TaiSan.SoNamSuDung = vm.data.TaiSan.SoNamSuDung | 0;

            vm.data.TaiSan.TyLeHaoMon = 100 / vm.data.TaiSan.SoNamSuDung;
            vm.data.TaiSan.HaoMonNam = vm.data.TaiSan.NguyenGia / vm.data.TaiSan.SoNamSuDung;

            vm.data.TaiSan.SoNamSDConLai = (moment().year() - moment(vm.data.TaiSan.NgayBDHaoMon, 'YYYY-MM-DD').year());
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSuDung - vm.data.TaiSan.SoNamSDConLai;
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSDConLai < 0 ? 0 : vm.data.TaiSan.SoNamSDConLai;

            vm.data.TaiSan.HaoMonLuyKe = (vm.data.TaiSan.SoNamSuDung - vm.data.TaiSan.SoNamSDConLai) * vm.data.TaiSan.HaoMonNam;
            vm.data.TaiSan.GiaTriConLai = vm.data.TaiSan.SoNamSDConLai * vm.data.TaiSan.HaoMonNam;

            vm.data.TaiSan.TyLeHaoMon = vm.data.TaiSan.TyLeHaoMon | 0;
            vm.data.TaiSan.HaoMonNam = vm.data.TaiSan.HaoMonNam | 0;
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSDConLai | 0;
            vm.data.TaiSan.HaoMonLuyKe = vm.data.TaiSan.HaoMonLuyKe | 0;
            vm.data.TaiSan.GiaTriConLai = vm.data.TaiSan.GiaTriConLai | 0;
        }

        /*** API FUNCTION ***/

        function getMenu() {
            var deferred = $q.defer();

            var data = {};
            data.NhanVienId = userInfo.NhanVienId || 0;
            TraCuuTaiSanService.getListMenuCoSo(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    vm.data.menuCoSo = success.data.data;
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function getTaiSanById(id) {
            var deferred = $q.defer();

            var data = {};
            data.TaiSanId = id;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.getById(data).then(function (success) {
                console.log(success);
                delete vm.data.TaiSan;
                if (success.data.data && success.data.data && success.data.data.length > 0) {
                    vm.data.TaiSan = success.data.data[0];
                } else {
                    vm.data.TaiSan = {};
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function getPageTaiSan(tableState) {
            var deferred = $q.defer();
            if (tableState) {
                vm.cache.tableState = tableState;
            }
            else if (vm.cache.tableState) {
                tableState = vm.cache.tableState;
            }
            else {
                tableState = utility.initTableState(tableState);
                vm.cache.tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;
            tableState.sort.reverse = tableState.sort.reverse === undefined ? true : tableState.sort.reverse;
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'TS.TaiSanId' : tableState.sort.predicate;

            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.NhanVienId = vm.inputSearch.NhanVienId || 0;
            data.PhongBanId = vm.inputSearch.PhongBanId || 0;
            data.CoSoId = vm.inputSearch.CoSoId || 0;
            data.LoaiKeKhai = vm.inputSearch.LoaiKeKhai || '';
            data.Search = vm.inputSearch.search || '';

            data.COSO_ID = userInfo.CoSoId;
            data.NHANVIEN_ID = userInfo.NhanVienId;

            TraCuuTaiSanService.getPageTaiSan(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    vm.data.ListTaiSan = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function getListNguyenGia(id) {
            var deferred = $q.defer();

            var data = {};
            data.TaiSanId = id;

            TaiSanService.getListNguyenGiaByTaiSanId(data).then(function (success) {
                console.log('TaiSanService.getListNguyenGiaByTaiSanId');
                console.log(success);
                delete vm.data.listNguyenGia;
                vm.data.listNguyenGia = success.data.data;
                return deferred.resolve(success.data.data);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function loadThongTinKeKhai(taisan) {
            console.log('loadThongTinKeKhai');
            console.log(taisan);
            delete vm.data.TTKK_Dat; vm.data.TTKK_Dat = {}; // Thông tin kê khai đất
            delete vm.data.TTKK_Nha; vm.data.TTKK_Nha = {}; // Thông tin kê khai nhà
            delete vm.data.TTKK_Oto; vm.data.TTKK_Oto = {}; // Thông tin kê khai ô tô
            delete vm.data.TTKK_500; vm.data.TTKK_500 = {}; // Thông tin kê khai tài sản trên 500 triệu

            if (!taisan) { return; }
            switch (taisan.LoaiKeKhai.toString()) {
                case '1':
                    getTTKK_DatById(taisan.TaiSanId);
                    break;
                case '2':
                    getTTKK_NhaById(taisan.TaiSanId);
                    break;
                case '3':
                    getTTKK_OtoById(taisan.TaiSanId);
                    break;
                case '4':
                    getTTKK_500ById(taisan.TaiSanId);
                    break;
                default:
                    return;
            }
        }
        function getTTKK_DatById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_DatById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_DatById');
                console.log(success);
                delete vm.data.TTKK_Dat;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Dat = success.data.data[0];
                }
                vm.data.TTKK_Dat = vm.data.TTKK_Dat || {};
            }, function (error) {
                console.log(error);
            });
        }
        function getTTKK_NhaById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_NhaById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_NhaById');
                console.log(success);
                delete vm.data.TTKK_Nha;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Nha = success.data.data[0];
                }
                vm.data.TTKK_Nha = vm.data.TTKK_Nha || {};
            }, function (error) {
                console.log(error);
            });
        }
        function getTTKK_OtoById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_OtoById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_OtoById');
                console.log(success);
                delete vm.data.TTKK_Oto;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Oto = success.data.data[0];
                    vm.data.TTKK_Oto.LoaiXe = vm.data.TTKK_Oto.LoaiXe.toString();
                }
                vm.data.TTKK_Oto = vm.data.TTKK_Oto || {};
            }, function (error) {
                console.log(error);
            });
        }
        function getTTKK_500ById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_500ById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_500ById');
                console.log(success);
                delete vm.data.TTKK_500;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_500 = success.data.data[0];
                }
                vm.data.TTKK_500 = vm.data.TTKK_500 || {};
            }, function (error) {
                console.log(error);
            });
        }

        /*** HELPER FUNCTION ***/

        function setupNavTree() {
            $timeout(function () {
                $('ul[data-toggle=nav-tree]').each(function () {
                    var $tree;
                    $tree = $(this);
                    $tree.navTree($tree.data());
                });
            }, 0);
        }

        function list_to_tree(list) {
            var map = {}, node, roots = [], i;
            for (i = 0; i < list.length; i += 1) {
                map[list[i].TYPE + list[i].ID] = i + 1; // initialize the map
                list[i].SubMenu = []; // initialize the children
            }

            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.TRUCTHUOC !== 0 && map['COSO' + node.TRUCTHUOC]) {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map['COSO' + node.TRUCTHUOC] - 1].SubMenu.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        }
    });

    module.directive('timeline', function () {
        return {
            restrict: 'E',
            scope: {
                tagId: '@',
                nhanVienId: '<',
                taiSanId: '<',
                phongBanId: '<',
                homeUrl: '@'
            },
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'timeline.html';
            },
            controller: function ($scope, $http, TraCuuTaiSanService, $q, $timeout) {
                var vm = this;
                console.log($scope.homeUrl);
                vm.temp = { Ngay: '0' };
                vm.data = {};
                vm.data.listTimeline = [];
                vm.data.listType = [
                    { type: 'DANHGIA', title: 'Đánh giá', link: $scope.homeUrl + 'danhgiataisan/edit/', icon: 'fa fa-fw fa-edit', style: 'panel panel-default' },
                    { type: 'GHITANG', title: 'Ghi tăng', link: $scope.homeUrl + 'ghitang/edit/', icon: 'fa fa-fw fa-arrow-up', style: 'panel panel-success' },
                    { type: 'GHIGIAM', title: 'Ghi giảm', link: $scope.homeUrl + 'ghigiam/edit/', icon: 'fa fa-fw fa-arrow-down', style: 'panel panel-danger' },
                    { type: 'TDTT', title: 'Thay đổi thông tin', link: $scope.homeUrl + 'thaydoithongtinkekhai/edit/', icon: 'fa fa-fw fa-edit', style: 'panel panel-default' },
                    { type: 'KHAITHAC', title: 'Khai thác', link: $scope.homeUrl + 'khaithac/edit/', icon: 'fa fa-fw fa-edit', style: 'panel panel-info' },
                    { type: 'DIEUCHUYEN', title: 'Điều chuyển', link: $scope.homeUrl + 'dieuchuyen/edit/', icon: 'fa fa-fw fa-edit', style: 'panel panel-warning' },
                ]

                activate();
                function activate() {
                    eventListener();
                }

                /*** INIT / EVENT FUNCTION ***/

                function eventListener() {
                    $(document).ready(function () {
                        $('#' + $scope.tagId).on("shown.bs.collapse", function () {
                            console.log('shown.bs.collapse');
                            console.log($scope);
                        });
                    });

                }

                $scope.$watchGroup(['nhanVienId', 'phongBanId', 'taiSanId'], function (newValues, oldValues) {
                    console.log(newValues);
                    console.log(oldValues);
                    if (!newValues[0] || !newValues[1] || !newValues[2]) { return; }

                    //if (newValues[0] == oldValues[0]
                    //    && newValues[1] == oldValues[1]
                    //    && newValues[2] == oldValues[2]) { return; }
                    vm.temp.Ngay = '';
                    getLuocSu();
                });
                /*** ACTION FUNCTION ***/
                vm.action = {};

                /*** BIZ FUNCTION ***/
                /** API FUNCTION ***/
                function getLuocSu() {
                    var data = {};
                    data.nhanVienId = $scope.nhanVienId;
                    data.phongBanId = $scope.phongBanId;
                    data.taiSanId = $scope.taiSanId;

                    TraCuuTaiSanService.getLuocSu(data).then(function (success) {
                        console.log('TraCuuTaiSanService.getLuocSu');
                        console.log(success);
                        vm.data.listTimeline = success.data.data;
                    });
                }
            }
        }
    });
})();