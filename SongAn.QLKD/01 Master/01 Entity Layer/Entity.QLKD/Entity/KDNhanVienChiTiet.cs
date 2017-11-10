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
	[Table("KDNhanVienChiTiet")]
    public partial class KDNhanVienChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int NhanVienId { get; set; }
        public virtual int NhomKinhDoanhId { get; set; }
        public virtual string CachLamViec { get; set; }
        public virtual string TinhCach { get; set; }
        public virtual string SoThich { get; set; }
        public virtual string ThoiQuen { get; set; }
        public virtual string GhiChu { get; set; }

    }
}
