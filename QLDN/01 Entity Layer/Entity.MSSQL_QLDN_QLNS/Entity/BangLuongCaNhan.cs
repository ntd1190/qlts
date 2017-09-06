/*****************************************************************************
1. Create Date : 2017.04.15
2. Creator     : Tran Quoc Hung
3. Description : entity
4. History     : 2017.04.15 (Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the BangLuongCaNhan table.
    /// </summary>
	[Table("BangLuongCaNhan")]
    public partial class BangLuongCaNhan
    {
        [Key]
        public virtual int BangLuongCaNhanId { get; set; }
        public virtual int BangLuongId { get; set; }
        public virtual string TenBangLuong { get; set; }
        public virtual DateTime ThangNam { get; set; }
        public virtual DateTime NgayBatDau { get; set; }
        public virtual DateTime NgayKetThuc { get; set; }
        public virtual DateTime NgayTraLuong { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string MaNhanVien { get; set; }
        public virtual string HoTenNhanVien { get; set; }
        public virtual string PhongBan { get; set; }
        public virtual string ChucVu { get; set; }
        public virtual int NgayCong { get; set; }
        public virtual int NgayCongTac { get; set; }
        public virtual int NgayChamCong { get; set; }
        public virtual int NgayLamThuc { get; set; }
        public virtual short LuongDongBHXH { get; set; }
        public virtual short LuongChinhThuc { get; set; }
        public virtual int LuongNgay { get; set; }
        public virtual int LuongThang { get; set; }
        public virtual int TienCongTacPhi { get; set; }
        public virtual int TienThuong { get; set; }
        public virtual int TienDienThoai { get; set; }
        public virtual int TienTrachNhiem { get; set; }
        public virtual int TienCom { get; set; }
        public virtual int TienTangCa { get; set; }
        public virtual short NghiCoPhep { get; set; }
        public virtual short NghiKhongPhep { get; set; }
        public virtual int TruBHXH { get; set; }
        public virtual int TruBHYT { get; set; }
        public virtual int TruBHTN { get; set; }
        public virtual int TruCongDoan { get; set; }
        public virtual int TruLuong { get; set; }
        public virtual int TruTamUng { get; set; }
        public virtual int ThucLanh { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
