
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
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
