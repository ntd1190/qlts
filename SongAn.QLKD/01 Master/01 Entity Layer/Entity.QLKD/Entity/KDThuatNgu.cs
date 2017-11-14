/*****************************************************************************
1. Create Date : 2017.11.14
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.11.14 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    /// <summary>
    /// A class which represents the NguoiDung table.
    /// </summary>
	[Table("KDThuatNgu")]
    public partial class KDThuatNgu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ThuatNguId { get; set; }
        public virtual string MaThuatNgu { get; set; }
        public virtual string ThuatNgu { get; set; }
        public virtual string ViDu { get; set; }
        public virtual string DienGiai { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
