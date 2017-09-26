using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("SuDung")]
    public class SuDung
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int SuDungId { get; set; }
        public virtual int KyLap { get; set; }
        public virtual decimal Nam { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
