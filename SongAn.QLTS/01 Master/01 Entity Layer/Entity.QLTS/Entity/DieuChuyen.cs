using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("DieuChuyen")]
    public class DieuChuyen
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DieuChuyenId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual DateTime NgayChungTu { get; set; }
        public virtual DateTime NgayDieuChuyen { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int DuyetId { get; set; }
        public virtual int NguoiDuyet { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
