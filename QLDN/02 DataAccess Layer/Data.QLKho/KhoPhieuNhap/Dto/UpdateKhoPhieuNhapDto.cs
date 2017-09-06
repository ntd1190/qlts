using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoPhieuNhap.Dto
{
    public class UpdateKhoPhieuNhapDto 
    {
        public virtual int PhieuNhapId { get; set; }
        public virtual int KhachHangId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string NguoiGiaoHang { get; set; }
        public virtual string SoHoaDon { get; set; }
        public virtual string Seri { get; set; }
        public virtual DateTime NgayChungTu { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual string Hinh { get; set; }
        public virtual int? TaiKhoanCo { get; set; }
        public virtual int? TaiKhoanNo { get; set; }
        public virtual int KhoNhap { get; set; }
        public virtual DateTime? NgayThanhToan { get; set; }
        public virtual DateTime? NgayNhap { get; set; }
        public virtual int NguoiNhanHang { get; set; }
        public virtual int ThuKho { get; set; }
        public virtual decimal? ChiPhi { get; set; }
        public virtual decimal? ThueVAT { get; set; }
        public virtual int? CtrVersion { get; set; }
        public virtual int LOGIN_ID { get; set; }

        public string MESSAGE { get; set; }
        public string RESULT { get; set; }

    }
}
