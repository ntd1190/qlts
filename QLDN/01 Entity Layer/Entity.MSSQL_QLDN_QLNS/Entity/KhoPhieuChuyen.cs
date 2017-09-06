/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN NGOC TÂN
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN NGOC TÂN) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoPhieuChuyen table.
    /// </summary>
	[Table("KhoPhieuChuyen")]
    public partial class KhoPhieuChuyen
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuChuyenId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int? TaiKhoanNhap { get; set; }
        public virtual int? TaiKhoanXuat { get; set; }
        public virtual DateTime? NgayXuat { get; set; }
        public virtual DateTime? NgayNhap { get; set; }
        public virtual int KhoNhap { get; set; }
        public virtual int KhoXuat { get; set; }
        public virtual int? NguoiGiaoHang { get; set; }
        public virtual int? NguoiNhanHang { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual decimal? ChiPhi { get; set; }
        public virtual decimal? ThueVAT { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
