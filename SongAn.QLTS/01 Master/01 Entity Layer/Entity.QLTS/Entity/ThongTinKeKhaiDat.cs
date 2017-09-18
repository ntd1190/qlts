/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThongTinKeKhai_Dat")]
    public partial class ThongTinKeKhaiDat
    {
        public virtual int TaiSanId { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string GiayTo { get; set; }
        public virtual decimal DienTich { get; set; }
        public virtual decimal LamTruSo { get; set; }
        public virtual decimal CoSoHDSuNghiep { get; set; }
        public virtual decimal NhaO { get; set; }
        public virtual decimal ChoThue { get; set; }
        public virtual decimal BoTrong { get; set; }
        public virtual decimal BiLanChiem { get; set; }
        public virtual decimal SuDungKhac { get; set; }
    }
}
