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
    /// A class which represents the QuaTrinhCongTac table.
    /// </summary>
	[Table("QuaTrinhCongTac")]
    public partial class QuaTrinhCongTac
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int QuaTrinhCongTacId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime TuNgay { get; set; }
        public virtual DateTime DenNgay { get; set; }
        public virtual int ChucVuId { get; set; }
        public virtual string CongViecChinh { get; set; }
        public virtual string ThanhTuu { get; set; }
        public virtual string Hinh { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
