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
    /// A class which represents the NhanVienDuAn table.
    /// </summary>
	[Table("NhanVienDuAn")]
    public partial class NhanVienDuAn
    {
        [Key]
        public virtual int NhanVienId { get; set; }
        [Key]
        public virtual int DuAnId { get; set; }
        public virtual int? ChucVuId { get; set; }
        public virtual int CtrVersion { get; set; }
        public virtual string XoaYN { get; set; }
    }
}
