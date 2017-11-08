
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SongAn.QLKD.Entity.QLKD.Entity
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
