/*****************************************************************************
1. Create Date : 2017.08.31
2. Creator     : NGUYỄN THANH BÌNH
3. Description : TaiSan entity
4. History     : 2017.08.31(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("TaiSan")]
    public partial class TaiSan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int TaiSanId { get; set; }
        public virtual string MaTaiSan { get; set; }
        public virtual string TenTaiSan { get; set; }
        public virtual string DonViTinh { get; set; }
        public virtual int LoaiId { get; set; }
        public virtual int? PhuongThucId { get; set; }
        public virtual decimal? NamSanXuat { get; set; }
        public virtual int NuocSanXuatId { get; set; }
        public virtual int? HangSanXuatId { get; set; }
        public virtual string SoQDTC { get; set; }
        public virtual string NhanHieu { get; set; }
        public virtual int? DuAnId { get; set; }
        public virtual DateTime NgayMua { get; set; }
        public virtual DateTime NgayGhiTang { get; set; }
        public virtual DateTime? NgayBDHaoMon { get; set; }
        public virtual int? SoNamSuDung { get; set; }
        public virtual decimal? TyLeHaoMon { get; set; }
        public virtual decimal? HaoMonLuyKe { get; set; }
        public virtual DateTime? NgayBDKhauHao { get; set; }
        public virtual string KyTinhKhauHao { get; set; }
        public virtual decimal? GiaTriKhauHao { get; set; }
        public virtual decimal? SoKyKhauHao { get; set; }
        public virtual decimal? TyLeKhauHao { get; set; }
        public virtual decimal? KhauHaoLuyKe { get; set; }
        public virtual int LoaiKeKhai { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
