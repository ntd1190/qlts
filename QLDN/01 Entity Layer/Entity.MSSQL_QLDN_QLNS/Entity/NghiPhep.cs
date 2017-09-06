/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Tran Quoc Hung
3. Function     : 
4. Description  : Nghi Phep entity
5. History      : 2017.04.15(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the NghiPhep table.
    /// </summary>
	[Table("NghiPhep")]
    public partial class NghiPhep
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int NghiPhepId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime TuNgay { get; set; }
        public virtual DateTime DenNgay { get; set; }
        public virtual decimal SoNgay { get; set; }
        public virtual short? LoaiNgay { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual string LyDo { get; set; }
        public virtual int? NguoiBanGiao { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int? NguoiDuyet { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string MaLoaiNghiPhep { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
