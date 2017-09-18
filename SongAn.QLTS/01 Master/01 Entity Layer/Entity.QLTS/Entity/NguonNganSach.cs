/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : NguonNganSach entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("NguonNganSach")]
    public class NguonNganSach
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int NguonNganSachId { get; set; }
        public virtual string MaNguonNganSach { get; set; }
        public virtual string TenNguonNganSach { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
