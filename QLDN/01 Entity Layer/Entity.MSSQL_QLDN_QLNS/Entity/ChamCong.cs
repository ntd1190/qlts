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
    /// A class which represents the ChamCong table.
    /// </summary>
	[Table("ChamCong")]
    public partial class ChamCong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ChamCongId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string MaNhanVien { get; set; }
        public virtual string Thu { get; set; }
        public virtual DateTime? Giolam { get; set; }
        public virtual DateTime? GioVe { get; set; }
        public virtual string IP { get; set; }
    }
}
