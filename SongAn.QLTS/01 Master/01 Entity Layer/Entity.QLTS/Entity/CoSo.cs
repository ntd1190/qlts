/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : CoSo entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("CoSo")]
    public class CoSo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CoSoId { get; set; }
        public virtual string MaCoSo { get; set; }
        public virtual string TenCoSo { get; set; }
        public virtual int LoaiCoSoId { get; set; }
        public virtual int TrucThuoc { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
