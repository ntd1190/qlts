using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("BienBanKiemKeChiTiet")]
    public class BienBanKiemKeChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BienBanKiemKeChiTietId { get; set; }
        public virtual int BienBanKiemKeId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual decimal SoLuong { get; set; }

    }
}
