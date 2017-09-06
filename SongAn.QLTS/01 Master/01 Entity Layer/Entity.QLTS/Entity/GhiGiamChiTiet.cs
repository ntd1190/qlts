/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : KeHoachMuaSam entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("GhiGiamChiTiet")]
    public class GhiGiamChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int GhiGiamChiTietId { get; set; }
        public virtual int GhiGiamId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual int XuLyId { get; set; }
        public virtual int SoLuong { get; set; }
    }
}
