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
    [Table("GhiGiam")]
    public class GhiGiam
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int GhiGiamId { get; set; }
        public virtual string SoChungTu { get; set; }
        public virtual DateTime? NgayChungTu { get; set; }
        public virtual DateTime? NgayGhiGiam { get; set; }
        public virtual string PhongBanId { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int DuyetId { get; set; }
        public virtual string NguoiDuyet { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
