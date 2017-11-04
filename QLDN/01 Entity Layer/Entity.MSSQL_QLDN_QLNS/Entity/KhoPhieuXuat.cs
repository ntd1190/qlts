/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN THANH BÌNH
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoPhieuXuat table.
    /// </summary>
	[Table("KhoPhieuXuat")]
    public partial class KhoPhieuXuat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuXuatId { get; set; }
        public virtual int? KhachHangId { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string LoaiPhieu { get; set; }
        public virtual string NguoiNhanHang { get; set; }
        public virtual string SoDienThoai { get; set; }
        public virtual string SoHoaDon { get; set; }
        public virtual string Seri { get; set; }
        public virtual DateTime? NgayChungTu { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int? TaiKhoanCo { get; set; }
        public virtual int? TaiKhoanNo { get; set; }
        public virtual int? TaiKhoanKho { get; set; }
        public virtual int? TaiKhoanGiaVon { get; set; }
        public virtual int KhoXuat { get; set; }
        public virtual DateTime? NgayThanhToan { get; set; }
        public virtual DateTime? NgayXuat { get; set; }
        public virtual int? ThuKho { get; set; }
        public virtual int? NguoiGiaoHang { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual decimal? ChiPhi { get; set; }
        public virtual decimal? ThueVAT { get; set; }
        public virtual decimal? TienThue { get; set; }
        public virtual decimal? ChietKhau { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
