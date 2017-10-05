using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("LapBaoCaoChiTiet")]
    public class LapBaoCaoChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int LapBaoCaoChiTietId { get; set; }
        public virtual int LapBaoCaoId { get; set; }
        public virtual int BaoCaoId { get; set; }
        public virtual string DuyetId { get; set; }
        public virtual DateTime NgayDuyet { get; set; }
        public virtual string NoiDungDuyet { get; set; }

    }
}
