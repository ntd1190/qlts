using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("BienBanKiemKe")]
    public class BienBanKiemKe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BienBanKiemKeId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual DateTime NgayChungTu { get; set; }
        public virtual DateTime NgayKiemKe { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }


    }
}
