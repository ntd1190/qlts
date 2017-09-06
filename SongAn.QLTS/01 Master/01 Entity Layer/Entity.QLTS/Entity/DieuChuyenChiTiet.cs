using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("DieuChuyenChiTiet")]
    public class DieuChuyenChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DieuChuyenChiTietId { get; set; }
        public virtual int DieuChuyenId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual int PhongBanSuDung { get; set; }
        public virtual int PhongBanChuyenDen { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual string LyDo { get; set; }

    }
}
