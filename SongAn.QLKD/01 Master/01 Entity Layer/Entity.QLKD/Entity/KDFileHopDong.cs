/*****************************************************************************
1. Create Date : 2017.11.16
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.11.16 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    /// <summary>
    /// A class which represents the NguoiDung table.
    /// </summary>
	[Table("KDFileHopDong")]
    public partial class KDFileHopDong
    {
        public virtual int FileHopDongId { get; set; } 
        public virtual int HopDongId { get; set; }
        public virtual string DaLam { get; set; }
        public virtual string NguoiLam { get; set; }
        public virtual string DaChuyen { get; set; }
        public virtual string NguoiChuyen { get; set; }
        public virtual DateTime? NgayChuyen { get; set; }
        public virtual string NguoiNhan { get; set; }
        public virtual DateTime? NgayNhan { get; set; }
        public virtual string FileMem { get; set; }
        public virtual string FileCung { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
