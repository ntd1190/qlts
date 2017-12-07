using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDDieuPhoiChiTiet")]
    public partial class KDDieuPhoiChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DieuPhoiChiTietId { get; set; }
        public virtual int DieuPhoiId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual int KhachHangId { get; set; }
        public virtual int DaChuyen { get; set; }
        public virtual string NguoiChuyen { get; set; }
        public virtual string DiaChiGui { get; set; }
        public virtual string DiaChiNhan { get; set; }
        public virtual string NguoiNhan { get; set; }
        public virtual DateTime NgayNhan { get; set; }
        public virtual int TrangThai { get; set; }
    }
}
