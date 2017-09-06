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
    /// A class which represents the TangCa table.
    /// </summary>
	[Table("TangCa")]
    public partial class TangCa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int TangCaId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime NgayTangCa { get; set; }
        public virtual DateTime GioBatDau { get; set; }
        public virtual DateTime GioKetThuc { get; set; }
        public virtual decimal SoGio { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual string LyDo { get; set; }
        public virtual string Loai { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int? NguoiDuyet { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
