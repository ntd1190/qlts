/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : VaiTro entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS_MAIN.Entity
{
    /// <summary>
    /// A class which represents the VaiTro table.
    /// </summary>
	[Table("VaiTro")]
    public partial class VaiTro
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int VaiTroId { get; set; }
        public virtual string MaVaiTro { get; set; }
        public virtual string TenVaiTro { get; set; }
        public virtual string MoTa { get; set; }
        public virtual bool KhoaYN { get; set; }
        public virtual string TenVaiTroRex { get; set; }
        public virtual DateTime? NgayTaoDT { get; set; }
        public virtual DateTime? NgaySuaDT { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual string NguoiSua { get; set; }
        public virtual int CtrVersion { get; set; }
        public virtual int CoSoId { get; set; }
    }
}
