/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : QuyenTacVu entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD_MAIN.Entity
{
    /// <summary>
    /// A class which represents the QuyenTacVu table.
    /// </summary>
	[Table("QuyenTacVu")]
    public partial class QuyenTacVu
    {
        [Key]
        public virtual int VaiTroId { get; set; }
        [Key]
        public virtual int ChucNangId { get; set; }
        public virtual string DSQuyenTacVu { get; set; }
    }
}
