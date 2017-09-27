/*****************************************************************************
1. Create Date : 2017.09.25
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.25 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("DanhGia_NguyenGia")]
    public partial class DanhGiaNguyenGia
    {
        public virtual int DanhGiaId { get; set; }
        public virtual int NguonNganSachId { get; set; }
        public virtual decimal GiaTriCu { get; set; }
    }
}
