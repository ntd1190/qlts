/*****************************************************************************
1. Create Date : 2017.04.15
2. Creator     : Tran Quoc Hung
3. Description : entity
4. History     : 2017.04.15 (Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the HinhAnh table.
    /// </summary>
	[Table("HinhAnh")]
    public partial class HinhAnh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int HinhAnhId { get; set; }
        public virtual string Ten { get; set; }
        public virtual string DuongDan { get; set; }
        public virtual string KichThuoc { get; set; }
        public virtual decimal? DungLuong { get; set; }
        public virtual string ChiaSe { get; set; }
        public virtual string XoaYN { get; set; }
    }
}
