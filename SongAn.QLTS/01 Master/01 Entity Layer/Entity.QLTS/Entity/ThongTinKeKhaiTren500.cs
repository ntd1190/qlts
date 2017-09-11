/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThongTinKeKhai_Tren500")]
    public partial class ThongTinKeKhaiTren500
    {
        public virtual int TaiSanId { get; set; }
        public virtual string KyHieu { get; set; }
        public virtual int HienTrangSuDung { get; set; }
    }
}
