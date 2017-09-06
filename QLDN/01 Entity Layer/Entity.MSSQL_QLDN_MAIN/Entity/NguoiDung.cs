/*****************************************************************************
1. Create Date : 2017.03.26
2. Creator     : Tran Quoc Hung
3. Description : NguoiDung entity
4. History     : 2017.03.26(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity
{
    /// <summary>
    /// A class which represents the NguoiDung table.
    /// </summary>
	[Table("NguoiDung")]
    public partial class NguoiDung
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int NguoiDungId { get; set; }
        public virtual string MaNguoiDung { get; set; }
        public virtual string Email { get; set; }
        public virtual bool EmailDaXacNhanYN { get; set; }
        public virtual string PasswordHash { get; set; }
        public virtual string SecurityStamp { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual bool DienThoaiDaXacNhanYN { get; set; }
        public virtual bool BaoMatHaiLopYN { get; set; }
        public virtual DateTime? KhoaDen { get; set; }
        public virtual bool KhoaYN { get; set; }
        public virtual int LanDangNhapSai { get; set; }
        public virtual string UserName { get; set; }
        public virtual int VaiTroId { get; set; }
        public virtual string HoTen { get; set; }
        public virtual int? NhanVienId { get; set; }
        public virtual DateTime? NgayTaoDT { get; set; }
        public virtual DateTime? NgaySuaDT { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual string NguoiSua { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
