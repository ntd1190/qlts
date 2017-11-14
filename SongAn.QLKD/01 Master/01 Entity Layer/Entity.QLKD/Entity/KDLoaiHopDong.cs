/*****************************************************************************
1. Create Date : 2017.11.14
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.11.14 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    /// <summary>
    /// A class which represents the NguoiDung table.
    /// </summary>
	[Table("KDLoaiHopDong")]
    public partial class KDLoaiHopDong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int LoaiHopDongId { get; set; }
        public virtual string MaLoaiHopDong { get; set; }
        public virtual string TenLoaiHopDong { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
