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
    /// A class which represents the ChucVu table.
    /// </summary>
	[Table("ChucVu")]
    public partial class ChucVu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ChucVuId { get; set; }
        public virtual string MaChucVu { get; set; }
        public virtual string TenChucVu { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
