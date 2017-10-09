using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("LapBaoCao")]
    public class LapBaoCao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int LapBaoCaoId { get; set; }
        public virtual int KyBaoCao { get; set; }
        public virtual DateTime TuNgay { get; set; }
        public virtual DateTime DenNgay { get; set; }
        public virtual string DienGiai { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int DuyetId { get; set; }
        public virtual int GuiCapTren { get; set; }
        public virtual DateTime? NgayDuyet { get; set; }
        public virtual string NoiDungDuyet { get; set; }
        public virtual int NguoiDuyet { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
