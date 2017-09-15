/*****************************************************************************
1. Create Date : 2017.09.12
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.12 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThayDoiThongTin_Oto")]
    public partial class ThayDoiThongTinOto
    {
        public virtual int ThayDoiThongTinId { get; set; }
        public virtual string NhanHieuCu { get; set; }
        public virtual string BienKiemSoatCu { get; set; }
        public virtual decimal CongSuatXeCu { get; set; }
        public virtual decimal TrongTaiCu { get; set; }
        public virtual string ChucDanhCu { get; set; }
        public virtual string NguonGocXeCu { get; set; }
        public virtual int LoaiXeCu { get; set; }
        public virtual int HienTrangSuDungCu { get; set; }
    }
}
