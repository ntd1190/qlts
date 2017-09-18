using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("GhiTang")]
    public class GhiTang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int GhiTangId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual DateTime NgayChungTu { get; set; }
        public virtual DateTime NgayGhiTang { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int DuyetId { get; set; }
        public virtual int NguoiDuyet { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }


    }
}
