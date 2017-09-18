using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("DeNghiTrangCapChiTiet")]
    public class DeNghiTrangCapChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DeNghiChiTietId { get; set; }
        public virtual int DeNghiId { get; set; }
        public virtual string TenTaiSan { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int LoaiId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual string DonViTinh { get; set; }
        public virtual int PhuongThucId { get; set; }
        public virtual DateTime NgayDeNghi { get; set; }
        public virtual decimal DuToan { get; set; }
        public virtual decimal DuToanDuocDuyet { get; set; }
        public virtual string GhiChu { get; set; }

    }
}
