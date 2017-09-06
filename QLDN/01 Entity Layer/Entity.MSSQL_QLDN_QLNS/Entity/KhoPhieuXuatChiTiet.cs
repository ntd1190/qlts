/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN THANH BÌNH
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoPhieuXuatChiTiet table.
    /// </summary>
	[Table("KhoPhieuXuatChiTiet")]
    public partial class KhoPhieuXuatChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuXuatChiTietId { get; set; }
        public virtual int PhieuXuatId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual string LoHang { get; set; }
        public virtual int? ThoiGianBaoHanh { get; set; }
        public virtual decimal GiaNhap { get; set; }
        public virtual string XoaYN { get; set; }
    }
}
