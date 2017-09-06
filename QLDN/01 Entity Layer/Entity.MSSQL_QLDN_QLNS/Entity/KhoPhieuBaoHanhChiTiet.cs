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
    /// A class which represents the KhoPhieuBaoHanhChiTiet table.
    /// </summary>
	[Table("KhoPhieuBaoHanhChiTiet")]
    public partial class KhoPhieuBaoHanhChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuBaoHanhChiTietId { get; set; }
        public virtual int? PhieuBaoHanhId { get; set; }
        public virtual int? ThietBi { get; set; }
        public virtual string TenThietBi { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int? ThietBiThayThe { get; set; }
        public virtual string TenThietBiThayThe { get; set; }
        public virtual string TrangThaiThietBi { get; set; }
        public virtual decimal? ChiPhi { get; set; }
        public virtual decimal? ThueVAT { get; set; }
        public virtual decimal? KhuyenMai { get; set; }
        public virtual DateTime? NgayTao { get; set; }
    }
}
