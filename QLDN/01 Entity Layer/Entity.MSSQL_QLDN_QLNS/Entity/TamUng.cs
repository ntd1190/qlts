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
    /// A class which represents the TamUng table.
    /// </summary>
	[Table("TamUng")]
    public partial class TamUng
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int TamUngId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string So { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual int Tien { get; set; }
        public virtual string BangChu { get; set; }
        public virtual string LyDo { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
