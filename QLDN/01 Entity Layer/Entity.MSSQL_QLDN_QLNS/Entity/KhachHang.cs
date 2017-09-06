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
    /// A class which represents the KhachHang table.
    /// </summary>
	[Table("KhachHang")]
    public partial class KhachHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KhachHangId { get; set; }
        public virtual string Ma { get; set; }
        public virtual string Ten { get; set; }
        public virtual short Loai { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string DiDong { get; set; }
        public virtual string Email { get; set; }
        public virtual string DiaChi { get; set; }
        public virtual int QuanHuyenId { get; set; }
        public virtual int TinhThanhPhoId { get; set; }
        public virtual int PhuongXaId { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string AnyDesk { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
