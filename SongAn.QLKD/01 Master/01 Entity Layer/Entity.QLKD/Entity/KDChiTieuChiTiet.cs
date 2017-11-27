using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDChiTieuChiTiet")]
    public partial class KDChiTieuChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ChiTieuChiTietId { get; set; }
        public virtual int ChiTieuId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual decimal Thang1 { get; set; }
        public virtual decimal Thang2 { get; set; }
        public virtual decimal Thang3 { get; set; }
        public virtual decimal Thang4 { get; set; }
        public virtual decimal Thang5 { get; set; }
        public virtual decimal Thang6 { get; set; }
        public virtual decimal Thang7 { get; set; }
        public virtual decimal Thang8 { get; set; }
        public virtual decimal Thang9 { get; set; }
        public virtual decimal Thang10 { get; set; }
        public virtual decimal Thang11 { get; set; }
        public virtual decimal Thang12 { get; set; }
        public virtual DateTime NgayCapNhat { get; set; }


    }
}
