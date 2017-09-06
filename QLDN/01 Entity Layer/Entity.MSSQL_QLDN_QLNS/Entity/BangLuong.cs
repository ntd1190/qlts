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
    /// A class which represents the BangLuong table.
    /// </summary>
	[Table("BangLuong")]
    public partial class BangLuong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BangLuongId { get; set; }
        public virtual string TenBangLuong { get; set; }
        public virtual DateTime ThangNam { get; set; }
        public virtual string TanSuatTraLuong { get; set; }
        public virtual DateTime NgayBatDau { get; set; }
        public virtual DateTime NgayKetThuc { get; set; }
        public virtual DateTime NgayTraLuong { get; set; }
        public virtual short SoNgay { get; set; }
        public virtual short SoNguoi { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
