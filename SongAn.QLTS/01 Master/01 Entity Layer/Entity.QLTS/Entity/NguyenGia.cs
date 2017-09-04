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
    [Table("NguyenGia")]
    public partial class NguyenGia
    {
        [Key]
        public virtual int TaiSanId { get; set; }
        [Key]
        public virtual int NguonNganSachId { get; set; }
        public virtual decimal? GiaTri { get; set; }
    }
}
