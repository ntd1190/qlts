using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("GhiTangChiTiet")]
    public class GhiTangChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int GhiTangChiTietId { get; set; }
        public virtual int GhiTangId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual DateTime NgayBatDauSuDung { get; set; }
        public virtual int? PhongBanId { get; set; }
        public virtual int? NhanVienId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual int? HopDongId { get; set; }
    }
}
