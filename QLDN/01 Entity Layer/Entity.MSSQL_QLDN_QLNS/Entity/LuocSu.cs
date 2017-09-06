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
    /// A class which represents the LuocSu table.
    /// </summary>
	[Table("LuocSu")]
    public partial class LuocSu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int LuocSuId { get; set; }
        public virtual string ChucNang { get; set; }
        public virtual int DoiTuongId { get; set; }
        public virtual string SuKien { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual int NguoiDung { get; set; }
    }
}
