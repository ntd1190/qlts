/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThayDoiThongTin_Nha")]
    public partial class ThayDoiThongTinNha
    {
        public virtual int ThayDoiThongTinId { get; set; }
        public virtual string DiaChiCu { get; set; }
        public virtual string GiayToCu { get; set; }
        public virtual int CapHangCu { get; set; }
        public virtual int SoTangCu { get; set; }
        public virtual decimal NamSuDungCu { get; set; }
        public virtual decimal DienTichCu { get; set; }
        public virtual decimal TongDienTichSanCu { get; set; }
        public virtual decimal LamTruSoCu { get; set; }
        public virtual decimal CoSoHDSuNghiepCu { get; set; }
        public virtual decimal NhaOCu { get; set; }
        public virtual decimal ChoThueCu { get; set; }
        public virtual decimal BoTrongCu { get; set; }
        public virtual decimal BiLanChiemCu { get; set; }
        public virtual decimal SuDungKhacCu { get; set; }
    }
}
