/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThayDoiThongTin_Tren500")]
    public partial class ThayDoiThongTinTren500
    {
        public virtual int ThayDoiThongTinId { get; set; }
        public virtual string KyHieuCu { get; set; }
        public virtual int HienTrangSuDungCu { get; set; }
    }
}
