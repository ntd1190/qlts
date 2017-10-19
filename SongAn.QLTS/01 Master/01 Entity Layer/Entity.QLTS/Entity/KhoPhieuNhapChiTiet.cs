using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KhoPhieuNhapChiTiet")]
    public class KhoPhieuNhapChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhoPhieuNhapChiTietId { get; set; }
        public virtual int KhoPhieuNhapId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual decimal GiaMua { get; set; }
        public virtual decimal GiaBan { get; set; }
        public virtual decimal VAT { get; set; }
        public virtual string HangDung { get; set; }
        public virtual string LoSanXuat { get; set; }
    }
}
