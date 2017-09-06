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
    /// A class which represents the BaoHiemXaHoi table.
    /// </summary>
	[Table("BaoHiemXaHoi")]
    public partial class BaoHiemXaHoi
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BaoHiemXaHoiId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual string SoBHXH { get; set; }
        public virtual string SoBHYT { get; set; }
        public virtual decimal BHXH { get; set; }
        public virtual decimal BHYT { get; set; }
        public virtual decimal? BHTN { get; set; }
        public virtual decimal? CongDoan { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
