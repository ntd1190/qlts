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
    /// A class which represents the CongViec table.
    /// </summary>
	[Table("CongViec")]
    public partial class CongViec
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CongViecId { get; set; }
        public virtual int DuAnId { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual string MoTa { get; set; }
        public virtual DateTime NgayBatDau { get; set; }
        public virtual DateTime NgayKetThuc { get; set; }
        public virtual DateTime? NgayThatSuBatDau { get; set; }
        public virtual DateTime? NgayThatSuKetThuc { get; set; }
        public virtual decimal? SoNgay { get; set; }
        public virtual decimal? TienDo { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string NoiDungCongViec { get; set; }
        public virtual string ThuanLoiKhoKhan { get; set; }
        public virtual string GiaiPhapKienNghi { get; set; }
        public virtual int NguoiXuLy { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
