/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThongTinKeKhai_Nha")]
    public partial class ThongTinKeKhaiNha
    {
        public virtual int TaiSanId { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string GiayTo { get; set; }
        public virtual int CapHang { get; set; }
        public virtual int SoTang { get; set; }
        public virtual decimal NamSuDung { get; set; }
        public virtual decimal DienTich { get; set; }
        public virtual decimal TongDienTichSan { get; set; }
        public virtual decimal LamTruSo { get; set; }
        public virtual decimal CoSoHDSuNghiep { get; set; }
        public virtual decimal NhaO { get; set; }
        public virtual decimal ChoThue { get; set; }
        public virtual decimal BoTrong { get; set; }
        public virtual decimal BiLanChiem { get; set; }
        public virtual decimal SuDungKhac { get; set; }
    }
}
