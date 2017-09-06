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
    /// A class which represents the KhoHangHoa table.
    /// </summary>
	[Table("KhoHangHoa")]
    public partial class KhoHangHoa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int HangHoaId { get; set; }
        public virtual string MaHangHoa { get; set; }
        public virtual string TenHangHoa { get; set; }
        public virtual string TuKhoa { get; set; }
        public virtual string DonViTinh { get; set; }
        public virtual decimal? GiaMua { get; set; }
        public virtual decimal? GiaBan { get; set; }
        public virtual string ThueMua { get; set; }
        public virtual string ThueBan { get; set; }
        public virtual string CauHinh { get; set; }
        public virtual string Hinh { get; set; }
        public virtual int? ThoiGianBaoHanh { get; set; }
        public virtual int? NhomHangHoaId { get; set; }
        public virtual int? LoaiHangHoaId { get; set; }
        public virtual int? NhaCungCapId { get; set; }
        public virtual int? HangSanXuatId { get; set; }
        public virtual int? NuocSanXuatId { get; set; }
        public virtual string MoTa { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
    }
}
