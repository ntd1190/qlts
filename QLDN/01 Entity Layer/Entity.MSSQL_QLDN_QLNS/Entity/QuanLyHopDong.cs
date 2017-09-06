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
    /// A class which represents the QuanLyHopDong table.
    /// </summary>
	[Table("QuanLyHopDong")]
    public partial class QuanLyHopDong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int QuanLyHopDongId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime TuNgay { get; set; }
        public virtual DateTime DenNgay { get; set; }
        public virtual DateTime? NgayKetThucSom { get; set; }
        public virtual string HopDong { get; set; }
        public virtual decimal HuongLuong { get; set; }
        public virtual string Hinh { get; set; }
        public virtual int Luong { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
