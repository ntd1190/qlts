using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("HopDong")]
    public class HopDong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int HopDongId { get; set; }
        public virtual string SoHopDong { get; set; }
        public virtual DateTime NgayHopDong { get; set; }
        public virtual string TenNhaThau { get; set; }
        public virtual string DaiDien { get; set; }
        public virtual decimal GiaTriHopDong { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual string FileDinhKem { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
