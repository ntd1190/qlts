(function () {
    'use strict';

    angular
        .module('app')
        .factory('LuongService', NhanVienService);

    // connect database
    var db = openDatabase('QLTS', '1.0', 'Quản lý nhân sự', 2 * 1024 * 1024);

    // create table
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Luong (NhanVien unique, LuongCoBan, PhuCapCom, PhuCapDienThoai, PhuCapTrachNhiem, PhuCapDongPhuc, PhuCapKhac)');
    });

    function NhanVienService() {
        var service = {};

        service.create = function (luong, callback) {
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO Luong (Ma, LuongCoBan) VALUES (?, ?)', [luong.Ma, luong.LuongCoBan], callback);
            });
        }

        service.update = function (luong, callback) {
            var query = '';
            query += 'UPDATE Luong SET ';
            query += 'LuongCoBan=?, ';
            query += 'PhuCapCom=?, ';
            query += 'PhuCapDienThoai=?, ';
            query += 'PhuCapTrachNhiem=?, ';
            query += 'PhuCapDongPhuc=?, ';
            query += 'PhuCapKhac=?, ';
            query += 'WHERE NhanVien=?';

            db.transaction(function (tx) {
                tx.executeSql(query, [
                    luong.LuongCoBan,
                    luong.PhuCapCom,
                    luong.PhuCapDienThoai,
                    luong.PhuCapTrachNhiem,
                    luong.PhuCapDongPhuc,
                    luong.PhuCapKhac,
                    luong.NhanVien], callback);
            });
        }

        service.remove = function (ma, callback) {
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM Luong WHERE NhanVien=?', [ma], callback);
            });
        }

        service.read = function (ma, callback) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Luong WHERE NhanVien=?', [ma], callback);
            });
        }

        service.readAll = function (callback) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Luong', [], callback);
            });
        }

        return service;
    }
})();