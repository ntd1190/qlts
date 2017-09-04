/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Ngoc Tan
3. Description : PhongBan entity
4. History     : 2017.04.13(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("PhuongThuc")]
    public partial class PhuongThuc
    {
        [Key]
        public virtual int PhuongThucId { get; set; }
        public virtual string TenPhuongThuc { get; set; }
    }
}
