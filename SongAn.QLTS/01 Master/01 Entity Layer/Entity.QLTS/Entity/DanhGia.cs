/*****************************************************************************
1. Create Date : 2017.09.25
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.25 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("DanhGia")]
    public partial class DanhGia
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DanhGiaId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual DateTime NgayChungTu { get; set; }
        public virtual DateTime NgayDanhGia { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual decimal? HaoMonLuyKeCu { get; set; }
        public virtual int? SoNamSuDungCu { get; set; }
        public virtual decimal? TyLeHaoMonCu { get; set; }
        public virtual decimal? SLTonCu { get; set; }
        public virtual int? CoSoId { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
    }
}
