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
    /// A class which represents the CongViecTruocDay table.
    /// </summary>
	[Table("CongViecTruocDay")]
    public partial class CongViecTruocDay
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CongViecTruocDayId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime TuNgay { get; set; }
        public virtual DateTime DenNgay { get; set; }
        public virtual string CongTy { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
