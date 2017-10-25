using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KhoPhieuXuat")]
    public class KhoPhieuXuat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhoPhieuXuatId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual DateTime NgayXuat { get; set; }
        public virtual string Loai { get; set; }
        public virtual int KhoXuatId { get; set; }
        public virtual int? KhoNhanId { get; set; }
        public virtual string NguoiNhanHang { get; set; }
        public virtual string LyDo { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
