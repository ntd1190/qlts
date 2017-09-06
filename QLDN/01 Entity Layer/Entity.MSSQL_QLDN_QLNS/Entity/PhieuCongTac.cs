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
    /// A class which represents the PhieuCongTac table.
    /// </summary>
	[Table("PhieuCongTac")]
    public partial class PhieuCongTac
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuCongTacId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual DateTime NgayDi { get; set; }
        public virtual DateTime NgayVe { get; set; }
        public virtual decimal SoNgay { get; set; }
        public virtual int? NguoiDuyet { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int? DuAnId { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual decimal? ThanhToan { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
