/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN THANH BÌNH
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoNuocSanXuat table.
    /// </summary>
	[Table("KhoPhieuSeries")]
    public partial class KhoPhieuSeries
    {   
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int Id { get; set; }
        public virtual string Series { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string MaHangHoa { get; set; }
        public virtual int? HangHoaId { get; set; }
        public virtual int? ThoiGianBaoHanh { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
        public virtual string IsAuto { get; set; }
    }
}
