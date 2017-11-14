/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : NguoiDung entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
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
	[Table("KDDiaBan")]
    public partial class KDDiaBan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DiaBanId { get; set; }
        public virtual string MaDiaBan { get; set; }
        public virtual string TenDiaBan { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
