/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : DuAn entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KhoTonKhoChiTiet")]
    public class KhoTonKhoChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhoTonKhoChiTietId { get; set; }
        public virtual int KhoTonKhoId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual decimal GiaMua { get; set; }
        public virtual decimal GiaBan { get; set; }
        public virtual decimal TonDau { get; set; }
        public virtual decimal SLNhap { get; set; }
        public virtual decimal SLXuat { get; set; }
        public virtual int NguonNganSachId { get; set; }
        public virtual int NhaCungCapId { get; set; }
        public virtual string HanDung { get; set; }
        public virtual string LoSanXuat { get; set; }


    }
}
