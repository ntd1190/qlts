/*****************************************************************************
1. Create Date : 2017.03.26
2. Creator     : Tran Quoc Hung
3. Description : QuyenTacVu entity
4. History     : 2017.03.26(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity
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
