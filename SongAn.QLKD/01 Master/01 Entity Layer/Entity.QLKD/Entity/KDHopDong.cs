/*****************************************************************************
1. Create Date : 2017.11.16
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.11.16 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    /// <summary>
    /// A class which represents the NguoiDung table.
    /// </summary>
	[Table("KDHopDong")]
    public partial class KDHopDong
    {
        public virtual int HopDongId { get; set; } // HopDongId (Primary key)
        public virtual string SoHopDong { get; set; } // SoHopDong (length: 20)
        public virtual string TenHopDong { get; set; } // TenHopDong (length: 10)
        public virtual int? LoaiHopDongId { get; set; } // LoaiHopDongId
        public virtual int NhanVienId { get; set; } // NhanVienId
        public virtual int KhachHangId { get; set; } // KhachHangId
        public virtual DateTime NgayHopDong { get; set; } // NgayHopDong
        public virtual DateTime? NgayThanhLy { get; set; } // NgayThanhLy
        public virtual decimal SoTien { get; set; } // SoTien
        public virtual string SoHoaDon { get; set; } // SoHoaDon (length: 20)
        public virtual DateTime NgayHoaDon { get; set; } // NgayHoaDon
        public virtual int ThanhToan { get; set; } // ThanhToan
        public virtual decimal TyLe { get; set; } // TyLe
        public virtual string Chi { get; set; } // Chi (length: 2)
        public virtual int DuLieuId { get; set; } // DuLieuId
        public virtual int? NguoiTao { get; set; } // NguoiTao
        public virtual DateTime? NgayTao { get; set; } // NgayTao
        public virtual int? CtrVersion { get; set; } // CtrVersion
    }
}
