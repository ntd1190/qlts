/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : KeHoachMuaSamChiTiet entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("KeHoachMuaSamChiTiet")]
    public class KeHoachMuaSamChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int MuaSamChiTietId { get; set; }
        public virtual int MuaSamId { get; set; }
        public virtual string TenTaiSan { get; set; }
        public virtual int LoaiId { get; set; }
        public virtual int PhuongThucId { get; set; }
        public virtual string DonViTinh { get; set; }
        public virtual string MoTa { get; set; }
        public virtual DateTime? Ngay { get; set; }
        public virtual decimal SoLuong { get; set; }
        public virtual decimal DonGia { get; set; }
        public virtual int HinhThucId { get; set; }
        public virtual decimal DuToan { get; set; }
        public virtual string GhiChu { get; set; }
    }
}
