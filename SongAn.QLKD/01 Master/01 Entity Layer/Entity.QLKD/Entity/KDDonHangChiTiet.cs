using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDDonHangChiTiet")]
    public partial class KDDonHangChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DonHangChiTietId { get; set; }
        public virtual int DonHangId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual DateTime NgayYeuCau { get; set; }
        public virtual DateTime NgayNhanHang { get; set; }

    }
}
