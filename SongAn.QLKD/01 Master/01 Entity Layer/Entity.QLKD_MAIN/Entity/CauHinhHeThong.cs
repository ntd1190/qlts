/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : CauHinhHeThong entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD_MAIN.Entity
{
    /// <summary>
    /// A class which represents the CauHinhHeThong table.
    /// </summary>
	[Table("CauHinhHeThong")]
    public partial class CauHinhHeThong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CauHinhHeThongId { get; set; }
        public virtual string MaCauHinhHeThong { get; set; }
        public virtual string GiaTri { get; set; }
        public virtual string MoTa { get; set; }
        public virtual string ThuocNhom { get; set; }
        public virtual string DSMaVaiTro { get; set; }
        public virtual short? ThuTu { get; set; }
        public virtual DateTime? NgayTaoDT { get; set; }
        public virtual DateTime? NgaySuaDT { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual string NguoiSua { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
