/*****************************************************************************
1. Create Date : 2017.03.26
2. Creator     : Tran Quoc Hung
3. Description : ChucNang entity
4. History     : 2017.03.26(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity
{
    /// <summary>
    /// A class which represents the ChucNang table.
    /// </summary>
	[Table("ChucNang")]
    public partial class ChucNang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int ChucNangId { get; set; }
        public virtual string MaChucNang { get; set; }
        public virtual string TenChucNang { get; set; }
        public virtual string MoTa { get; set; }
        public virtual string DSQuyen { get; set; }
        public virtual string ThuocNhom { get; set; }
        public virtual string DuongDan { get; set; }
        public virtual short? ThuTu { get; set; }
        public virtual bool KhoaYN { get; set; }
        public virtual string TenChucNangRex { get; set; }
        public virtual DateTime? NgayTaoDT { get; set; }
        public virtual DateTime? NgaySuaDT { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual string NguoiSua { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
