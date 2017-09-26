using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("SuDungChiTiet")]
    public class SuDungChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int SuDungChiTietId { get; set; }
        public virtual int SuDungId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual decimal SoSanPhamPhucVu { get; set; }
        public virtual string DonViTinhSanPham { get; set; }
        public virtual decimal SoNguyenLieuSuDung { get; set; }
        public virtual string DonViTinhNguyenLieu { get; set; }
        public virtual string GhiChu { get; set; }

    }
}
