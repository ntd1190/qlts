(function () {
    'use strict';

    angular
        .module('app')
        .factory('NhanVienService', NhanVienService);

    var NhanVienSelected = [];

    var db = openDatabase('QLNS', '1.0', 'Quản lý nhân sự', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        var query = 'CREATE TABLE IF NOT EXISTS NhanVien (';
        query += 'Ma unique, Ten, PhongBan, ChucVu, NgayTuyenDung, DuAn, BangCap, ';
        query += 'NgaySinh, CMND, NgayCap, NoiCap, DiaChiThuongTru, DiaChiTamTru, DienThoai, DiDong, Email, GhiChu';
        query += ')';

        tx.executeSql(query);
    });

    function NhanVienService() {
        var service = {
            getById: getById,
            add: addNhanVien,
            update: updateNhanVien,
            remove: deleteNhanVien
        };

        service.getSelected = function () {
            return NhanVienSelected;
        }

        function fixNhanVien(nhanvien) {
            nhanvien.Ten = nhanvien.Ten ? nhanvien.Ten : '';
            nhanvien.PhongBan = nhanvien.PhongBan ? nhanvien.PhongBan : '';
            nhanvien.ChucVu = nhanvien.ChucVu ? nhanvien.ChucVu : '';
            nhanvien.NgayTuyenDung = nhanvien.NgayTuyenDung ? nhanvien.NgayTuyenDung : '';
            nhanvien.BangCap = nhanvien.BangCap ? nhanvien.BangCap : '';
            nhanvien.DuAn = nhanvien.DuAn ? nhanvien.DuAn : '';
            nhanvien.NgaySinh = nhanvien.NgaySinh ? nhanvien.NgaySinh : '';
            nhanvien.CMND = nhanvien.CMND ? nhanvien.CMND : '';
            nhanvien.NgayCap = nhanvien.NgayCap ? nhanvien.NgayCap : '';
            nhanvien.NoiCap = nhanvien.NoiCap ? nhanvien.NoiCap : '';
            nhanvien.DiaChiThuongTru = nhanvien.DiaChiThuongTru ? nhanvien.DiaChiThuongTru : '';
            nhanvien.DiaChiTamTru = nhanvien.DiaChiTamTru ? nhanvien.DiaChiTamTru : '';
            nhanvien.DienThoai = nhanvien.DienThoai ? nhanvien.DienThoai : '';
            nhanvien.DiDong = nhanvien.DiDong ? nhanvien.DiDong : '';
            nhanvien.Email = nhanvien.Email ? nhanvien.Email : '';
            nhanvien.GhiChu = nhanvien.GhiChu ? nhanvien.GhiChu : '';
        }

        function addNhanVien(nhanvien, onSuccess, onError) {
            fixNhanVien(nhanvien);
            console.log(nhanvien);
            var query = '';
            query += 'INSERT INTO NhanVien (';
            query += 'Ma, Ten, PhongBan, ChucVu, NgayTuyenDung, DuAn, BangCap, ';
            query += 'NgaySinh, CMND, NgayCap, NoiCap, DiaChiThuongTru, DiaChiTamTru, DienThoai, DiDong, Email, GhiChu';
            query += ') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            db.transaction(function (tx) {
                tx.executeSql(query, [
                    nhanvien.Ma, nhanvien.Ten, nhanvien.PhongBan, nhanvien.ChucVu, nhanvien.NgayTuyenDung, nhanvien.DuAn, nhanvien.BangCap,
                    nhanvien.NgaySinh, nhanvien.CMND, nhanvien.NgayCap, nhanvien.NoiCap, nhanvien.DiaChiThuongTru, nhanvien.DiaChiTamTru, nhanvien.DienThoai, nhanvien.DiDong, nhanvien.Email, nhanvien.GhiChu
                ],
                    onSuccess, onError);
            });
        }

        function updateNhanVien(nhanvien, onSuccess, onError) {
            fixNhanVien(nhanvien);
            var query = 'UPDATE NhanVien SET ';
            query += 'Ten=?, PhongBan=?, ChucVu=?, NgayTuyenDung=?, DuAn=?, BangCap=?, ';
            query += 'NgaySinh=?, CMND=?, NgayCap=?, NoiCap=?, DiaChiThuongTru=?,  DiaChiTamTru=?, DienThoai=?, DiDong=?, Email=?, GhiChu=? ';
            query += 'WHERE Ma=?';
            db.transaction(function (tx) {
                tx.executeSql(query, [
                    nhanvien.Ten, nhanvien.PhongBan, nhanvien.ChucVu, nhanvien.NgayTuyenDung, nhanvien.DuAn, nhanvien.BangCap,
                    nhanvien.NgaySinh, nhanvien.CMND, nhanvien.NgayCap, nhanvien.NoiCap, nhanvien.DiaChiThuongTru, nhanvien.DiaChiTamTru, nhanvien.DienThoai, nhanvien.DiDong, nhanvien.Email, nhanvien.GhiChu,
                    nhanvien.Ma
                ], onSuccess, onError);
            });
        }

        function deleteNhanVien(ma, onSuccess, onError) {
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM NhanVien WHERE Ma=?', [ma], onSuccess, onError);
            });
        }

        function getById(ma, onSuccess, onError) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM NhanVien WHERE Ma=?', [ma], onSuccess, onError);
            });
        }

        service.loadData = function (onSuccess, onError) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM NhanVien', [], onSuccess, onError);
            });
        }

        return service;
    }
})();