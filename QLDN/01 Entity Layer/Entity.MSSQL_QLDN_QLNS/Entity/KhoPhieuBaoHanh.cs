/*****************************************************************************
1. Create Date : 2017.07.28
2. Creator     : NGUYEN THANH BINH
3. Description : entity
4. History     : 2017.07.28 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoPhieuBaoHanh table.
    /// </summary>
	[Table("KhoPhieuBaoHanh")]
    public partial class KhoPhieuBaoHanh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuBaoHanhId { get; set; }
        public virtual string SeriesNo { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string TenKhachHang { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string TenThietBi { get; set; }
        public virtual string HangSanXuat { get; set; }
        public virtual DateTime NgayHen { get; set; }
        public virtual string ChuanDoan { get; set; }
        public virtual string YeuCauKhachHang { get; set; }
        public virtual string PhuKienKemTheo { get; set; }
        public virtual string TrangThaiTiepNhan { get; set; }
        public virtual string SanPhamCty { get; set; }
        public virtual string Email { get; set; }
        public virtual string LoaiBaoHanh { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
