using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDBaoGiaChiTiet")]
    public partial class KDBaoGiaChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BaoGiaChiTietId { get; set; }
        public virtual int BaoGiaId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual DateTime NgayBao { get; set; }
        public virtual DateTime NgayNhan { get; set; }
        

    }
}
