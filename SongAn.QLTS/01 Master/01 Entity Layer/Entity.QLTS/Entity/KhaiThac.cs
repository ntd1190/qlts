using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KhaiThac")]
    public class KhaiThac
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhaiThacId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual int KhachHangNCCId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual decimal SoLuongKhaiThac { get; set; }
        public virtual decimal DonGiaKhaiThac { get; set; }
        public virtual DateTime ThoiGianBatDau { get; set; }
        public virtual DateTime ThoiGianKetThuc { get; set; }
        public virtual decimal TienThu { get; set; }
        public virtual decimal NopNganSach { get; set; }
        public virtual decimal DonVi { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }
        public virtual int HopDongId { get; set; }
    }
}
