﻿/*****************************************************************************
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
    /// A class which represents the DeNghiThanhToanChiTiet table.
    /// </summary>
	[Table("DeNghiThanhToanChiTiet")]
    public partial class DeNghiThanhToanChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DeNghiThanhToanChiTietId { get; set; }
        public virtual int DeNghiThanhToanId { get; set; }
        public virtual DateTime Ngay { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual string DonViTinh { get; set; }
        public virtual int SoLuong { get; set; }
        public virtual int DonGia { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
