using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("GiayBaoHongChiTiet")]
    public class GiayBaoHongChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int GiayBaoHongChiTietId { get; set; }
        public virtual int GiayBaoHongId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual int SoLuong { get; set; }
        public virtual string LyDo { get; set; }
        public virtual string GhiChu { get; set; }

    }
}
