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
    /// A class which represents the QuanHeGiaDinh table.
    /// </summary>
	[Table("QuanHeGiaDinh")]
    public partial class QuanHeGiaDinh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int QuanHeGiaDinhId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string Ten { get; set; }
        public virtual string MoiQuanHe { get; set; }
        public virtual DateTime? NgaySinh { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string QueQuan { get; set; }
        public virtual string DanToc { get; set; }
        public virtual string TonGiao { get; set; }
        public virtual string CMND { get; set; }
        public virtual string HoChieu { get; set; }
        public virtual string NgheNghiep { get; set; }
        public virtual string NoiLamViec { get; set; }
        public virtual string Hinh { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
