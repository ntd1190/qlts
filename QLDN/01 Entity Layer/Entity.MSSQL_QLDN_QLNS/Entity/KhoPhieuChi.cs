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
    /// A class which represents the KhoPhieuNhap table.
    /// </summary>
	[Table("KhoPhieuChi")]
    public partial class KhoPhieuChi
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuChiId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual int? KhachHangId { get; set; }
        public virtual DateTime NgayChi { get; set; }
        public virtual string LyDo { get; set; }
        public virtual string SoTien { get; set; }
        public virtual string SoTienBangChu { get; set; }
        public virtual string HinhThucThanhToan { get; set; }
        public virtual string NganHang { get; set; }
        public virtual int? TaiKhoanCo { get; set; }
        public virtual int? TaiKhoanNo { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string Hinh { get; set; }
        public virtual int? NguoiNhanTien { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
