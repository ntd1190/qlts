/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN THANH BÌNH
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoKhoHang table.
    /// </summary>
	[Table("KhoKhoHang")]
    public partial class KhoKhoHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhoHangId { get; set; }
        public virtual string MaKho { get; set; }
        public virtual string TenKho { get; set; }
        public virtual int ChiNhanh { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
    }
}
