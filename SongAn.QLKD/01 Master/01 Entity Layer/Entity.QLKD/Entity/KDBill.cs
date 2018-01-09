
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLKD.Entity.QLKD.Entity
{

	[Table("KDBill")]
    public partial class KDBill
    {
        public virtual int BillId { get; set; }
        public virtual string SoBill { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int NguoiGui { get; set; }
        public virtual string NguoiNhan { get; set; }
        public virtual string SDT { get; set; }
        public virtual string DiaChiNhan { get; set; }
        public virtual DateTime NgayGui { get; set; }
        public virtual string NguoiNhanThucTe { get; set; }
        public virtual DateTime NgayNhanThucTe { get; set; }
        public virtual string HinhAnh { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
