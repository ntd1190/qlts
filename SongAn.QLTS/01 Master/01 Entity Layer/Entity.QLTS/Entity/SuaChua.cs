using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("SuaChua")]
    public class SuaChua
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int SuaChuaId { get; set; }
        public virtual int BaoDuongId { get; set; }
        public virtual string TenBoPhan { get; set; }
        public virtual DateTime NgayBatDau { get; set; }
        public virtual DateTime NgayKetThuc { get; set; }
        public virtual decimal ChiPhi { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual string NoiSua { get; set; }
        public virtual string KetQua { get; set; }
    }
}
