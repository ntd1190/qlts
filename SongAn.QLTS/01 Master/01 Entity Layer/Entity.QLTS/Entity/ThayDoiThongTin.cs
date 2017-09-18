/*****************************************************************************
1. Create Date : 2017.09.12
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.12 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThayDoiThongTin")]
    public partial class ThayDoiThongTin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ThayDoiThongTinId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual string TenTaiSanCu { get; set; }
        public virtual string LyDo { get; set; }
        public virtual int? DuyetId { get; set; }
        public virtual int? NguoiDuyet { get; set; }
        public virtual int? CoSoId { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}

