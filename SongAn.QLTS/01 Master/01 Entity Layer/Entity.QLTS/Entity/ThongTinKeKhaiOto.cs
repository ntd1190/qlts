/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThongTinKeKhai_Oto")]
    public partial class ThongTinKeKhaiOto
    {
        public virtual int TaiSanId { get; set; }
        public virtual string NhanHieu { get; set; }
        public virtual string BienKiemSoat { get; set; }
        public virtual decimal CongSuatXe { get; set; }
        public virtual decimal TrongTai { get; set; }
        public virtual string ChucDanh { get; set; }
        public virtual string NguonGocXe { get; set; }
        public virtual int LoaiXe { get; set; }
        public virtual int HienTrangSuDung { get; set; }
    }
}
