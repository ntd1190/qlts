using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDKhachHang")]
    public partial class KDKhachHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhachHangId { get; set; }
        public virtual string MaKhachHang { get; set; }
        public virtual int NhomKhachHangId { get; set; }
        public virtual string TenKhachHang { get; set; }
        public virtual DateTime? NgaySinh { get; set; }
        public virtual int GioiTinh { get; set; }
        public virtual string HinhAnh { get; set; }
        public virtual string SoNha { get; set; }
        public virtual int? TinhThanhPhoId { get; set; }
        public virtual int? QuanHuyenId { get; set; }
        public virtual int? PhuongXaId { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string FaceBook { get; set; }
        public virtual string Email { get; set; }
        public virtual string NgheNghiep { get; set; }
        public virtual string CoQuan { get; set; }
        public virtual string MaSoThue { get; set; }
        public virtual string EmailCoQuan { get; set; }
        public virtual string Fax { get; set; }
        public virtual string DiaChiCoQuan { get; set; }
        public virtual DateTime? NgayThanhLap { get; set; }
        public virtual string TheoDoi { get; set; }
        public virtual string Khac { get; set; }
        public virtual string NguoiPhuTrach { get; set; }
        public virtual string CachLamViec { get; set; }
        public virtual string TinhCach { get; set; }
        public virtual string SoThich { get; set; }
        public virtual string ThoiQuen { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
