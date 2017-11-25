/*****************************************************************************
1. Create Date : 2017.11.16
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.11.16 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    /// <summary>
    /// A class which represents the NguoiDung table.
    /// </summary>
	[Table("KDHopDongChiTiet")]
    public partial class KDHopDongChiTiet
    {
        public virtual int HopDongChiTietId { get; set; }
        public virtual int HopDongId { get; set; } 
        public virtual int HangHoaId { get; set; } 
        public virtual int LoaiHangHoa { get; set; } 
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual string DaTrienKhai { get; set; }
        public virtual string NguoiGiao { get; set; }
        public virtual string NguoiNhan { get; set; }
        public virtual DateTime? NgayThucHien { get; set; }
        public virtual DateTime? NgayKetThuc { get; set; }
        public virtual string GhiChu { get; set; }

    }
}
