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
    /// A class which represents the DeNghiThanhToan table.
    /// </summary>
	[Table("DeNghiThanhToan")]
    public partial class DeNghiThanhToan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DeNghiThanhToanId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual int? DuAnId { get; set; }
        public virtual int? NguoiDuyet { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
