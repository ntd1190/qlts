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
    /// A class which represents the KhoPhieuNhapChiTiet table.
    /// </summary>
	[Table("KhoPhieuNhapChiTiet")]
    public partial class KhoPhieuNhapChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuNhapChiTietId { get; set; }
        public virtual int PhieuNhapId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual int? ThoiGianBaoHanh { get; set; }
        public virtual string LoHang { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
