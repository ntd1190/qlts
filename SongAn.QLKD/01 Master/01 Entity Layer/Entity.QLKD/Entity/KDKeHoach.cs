using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDKeHoach")]
    public partial class KDKeHoach
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KeHoachId { get; set; }
        public virtual string KyKeHoach { get; set; }
        public virtual string Nam { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual int KhachHangId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
