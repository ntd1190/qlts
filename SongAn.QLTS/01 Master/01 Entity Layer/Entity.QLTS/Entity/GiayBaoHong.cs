using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("GiayBaoHong")]
    public class GiayBaoHong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int GiayBaoHongId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
