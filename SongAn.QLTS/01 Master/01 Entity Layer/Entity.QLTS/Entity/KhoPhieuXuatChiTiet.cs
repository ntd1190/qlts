using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KhoPhieuXuatChiTiet")]
    public class KhoPhieuXuatChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhoPhieuXuatChiTietId { get; set; }
        public virtual int KhoPhieuXuatId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual decimal GiaMua { get; set; }
        public virtual decimal GiaBan { get; set; }
        public virtual int NguonNganSachId { get; set; }
        public virtual int NhaCungCapId { get; set; }
        public virtual string HanDung { get; set; }
        public virtual string LoSanXuat { get; set; }
    }
}
