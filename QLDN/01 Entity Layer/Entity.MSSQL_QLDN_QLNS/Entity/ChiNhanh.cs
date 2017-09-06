/*****************************************************************************
1. Create Date : 2017.07.17
2. Creator     : NGUYEN THANH BINH
3. Description : entity
4. History     : 2017.07.17 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the ChiNhanh table.
    /// </summary>
	[Table("ChiNhanh")]
    public partial class ChiNhanh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ChiNhanhId { get; set; }
        public virtual string MaChiNhanh { get; set; }
        public virtual string TenChiNhanh { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int? ChiNhanhCha { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
