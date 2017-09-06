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
    /// A class which represents the VanBan table.
    /// </summary>
	[Table("VanBan")]
    public partial class VanBan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int VanBanId { get; set; }
        public virtual int VanBanTheLoaiId { get; set; }
        public virtual int So { get; set; }
        public virtual DateTime? NgayHoanThanh { get; set; }
        public virtual string DangTin { get; set; }
        public virtual string TraLoi { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual string GuiDen { get; set; }
        public virtual string Cc { get; set; }
        public virtual string TatCa { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
