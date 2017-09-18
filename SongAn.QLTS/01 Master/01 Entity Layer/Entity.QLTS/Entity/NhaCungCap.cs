/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : NhaCungCap entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("NhaCungCap")]
    public class NhaCungCap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int NhaCungCapId { get; set; }
        public virtual string MaNhaCungCap { get; set; }
        public virtual string TenNhaCungCap { get; set; }
        public virtual string Nhom { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string DiDong { get; set; }
        public virtual string MaSoThue { get; set; }
        public virtual string TKNganHang { get; set; }
        public virtual string TenNganHang { get; set; }
        public virtual string DaiDien { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
