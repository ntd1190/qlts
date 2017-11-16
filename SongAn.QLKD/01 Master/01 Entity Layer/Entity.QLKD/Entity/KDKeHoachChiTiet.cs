using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDKeHoachChiTiet")]
    public partial class KDKeHoachChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KeHoachChiTietId { get; set; }
        public virtual int KeHoachId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual int LoaiHangHoa { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual DateTime NgayDuKien { get; set; }
        public virtual int TrangThai { get; set; }
        public virtual DateTime NgayTao { get; set; }

    }
}
