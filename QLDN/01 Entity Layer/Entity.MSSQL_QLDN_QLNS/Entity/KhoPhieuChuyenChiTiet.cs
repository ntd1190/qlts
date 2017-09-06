/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN NGOC TÂN
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN NGOC TÂN) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoPhieuChuyenChiTiet table.
    /// </summary>
	[Table("KhoPhieuChuyenChiTiet")]
    public partial class KhoPhieuChuyenChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int PhieuChuyenChiTietId { get; set; }
        public virtual int PhieuChuyenId { get; set; }
        public virtual int HangHoaId { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual string LoHang { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
