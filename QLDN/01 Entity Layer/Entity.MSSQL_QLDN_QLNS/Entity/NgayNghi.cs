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
    /// A class which represents the NgayNghi table.
    /// </summary>
	[Table("NgayNghi")]
    public partial class NgayNghi
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public virtual DateTime Ngay { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
    }
}
