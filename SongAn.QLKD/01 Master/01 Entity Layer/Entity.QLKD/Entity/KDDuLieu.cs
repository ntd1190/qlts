/*****************************************************************************
1. Create Date : 2017.11.15
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.11.15 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
	[Table("KDDuLieu")]
    public partial class KDDuLieu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DuLieuId { get; set; }
        public virtual string MaDuLieu { get; set; }
        public virtual string TenDuLieu { get; set; }
        public virtual string ViTri { get; set; }
        public virtual string FileDinhKem { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
