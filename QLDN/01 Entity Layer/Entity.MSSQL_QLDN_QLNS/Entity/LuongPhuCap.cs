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
    /// A class which represents the LuongPhuCap table.
    /// </summary>
	[Table("LuongPhuCap")]
    public partial class LuongPhuCap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int LuongPhuCapId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual int? LuongCoBan { get; set; }
        public virtual int? LuongChinhThuc { get; set; }
        public virtual decimal? HuongLuong { get; set; }
        public virtual int? ComTrua { get; set; }
        public virtual int? DienThoai { get; set; }
        public virtual int? TrachNhiem { get; set; }
        public virtual int? DongPhuc { get; set; }
        public virtual int? Khac { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
