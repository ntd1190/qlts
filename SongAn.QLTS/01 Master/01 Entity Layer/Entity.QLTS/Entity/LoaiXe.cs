﻿/*****************************************************************************
1. Create Date : 2017.09.06
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.06(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("LoaiXe")]
    public partial class LoaiXe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int LoaiXeId { get; set; }
        public virtual string NoiDung { get; set; }
    }
}
