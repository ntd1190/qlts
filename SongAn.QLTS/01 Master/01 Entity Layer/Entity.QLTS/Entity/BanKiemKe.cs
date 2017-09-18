using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("BanKiemKe")]
    public class BanKiemKe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BanKiemKeId { get; set; }
        public virtual int BienBanKiemKeId { get; set; }
        public virtual string NguoiKiemKe { get; set; }
        public virtual string ChucVu { get; set; }
        public virtual string DaiDien { get; set; }
        public virtual string VaiTro { get; set; }

    }
}
