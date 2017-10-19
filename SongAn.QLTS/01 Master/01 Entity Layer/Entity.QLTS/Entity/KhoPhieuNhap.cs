using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KhoPhieuNhap")]
    public class KhoPhieuNhap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhoPhieuNhapId { get; set; }
        public virtual int KhoTaiSanId { get; set; }
        public virtual int NguonNganSachId { get; set; }
        public virtual int NhaCungCapId { get; set; }
        public virtual DateTime NgayNhap { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string Seri { get; set; }
        public virtual string SoHoaDon { get; set; }
        public virtual DateTime NgayHD { get; set; }
        public virtual string BBKiem { get; set; }
        public virtual int ChietKhau { get; set; }
        public virtual string NguoiGiao { get; set; }
        public virtual string Loai { get; set; }
        public virtual string TaiKhoanNo { get; set; }
        public virtual string TaiKhoanCo { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
