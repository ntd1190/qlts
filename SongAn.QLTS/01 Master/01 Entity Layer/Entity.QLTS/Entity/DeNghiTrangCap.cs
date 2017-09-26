using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("DeNghiTrangCap")]
    public class DeNghiTrangCap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DeNghiId { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual int PhanLoaiId { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int GuiCapTren { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int DuyetId { get; set; }
        public virtual int NguoiDuyet { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
