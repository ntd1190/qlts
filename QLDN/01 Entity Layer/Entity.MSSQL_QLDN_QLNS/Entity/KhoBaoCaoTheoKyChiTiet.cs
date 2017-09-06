using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    [Table("KhoBaoCaoTheoKyChiTiet")]
    public partial class KhoBaoCaoTheoKyChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KyChiTietId { get; set; }
        public virtual int KyId { get; set; }
        public virtual int KhoHangId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual string MaHangHoa { get; set; }
        public virtual decimal SoLuongTonDau{ get; set; }
        public virtual decimal GiaTriTonDau { get; set; }
        public virtual decimal SoLuongNhapTrongKy { get; set; }
        public virtual decimal GiaTriNhapTrongKy { get; set; }
        public virtual decimal SoLuongXuatTrongKy { get; set; }
        public virtual decimal DonGiaXuatBinhQuan { get; set; }
        public virtual decimal SoLuongTonCuoi { get; set; }
        public virtual decimal GiaTriTonCuoi { get; set; }
    }
}
