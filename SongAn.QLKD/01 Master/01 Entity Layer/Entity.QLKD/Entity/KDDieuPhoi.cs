using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDDieuPhoi")]
    public partial class KDDieuPhoi
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DieuPhoiId { get; set; }
        public virtual int DonHangId { get; set; }
        public virtual DateTime NgayDieuPhoi { get; set; }
        public virtual int NhanVienDieuPhoi { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
