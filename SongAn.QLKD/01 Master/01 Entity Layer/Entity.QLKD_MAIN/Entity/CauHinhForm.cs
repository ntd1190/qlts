﻿/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : CauHinhForm entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD_MAIN.Entity
{
    /// <summary>
    /// A class which represents the CauHinhForm table.
    /// </summary>
	[Table("CauHinhForm")]
    public partial class CauHinhForm
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CauHinhFormId { get; set; }
        public virtual string MaForm { get; set; }
        public virtual string TenForm { get; set; }
        public virtual bool? ChoPhepInYN { get; set; }
        public virtual bool? ChoPhepXuatPdfYN { get; set; }
        public virtual string KhoGiayIn { get; set; }
        public virtual string MoTa { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual bool? ChoPhepSapXepYN { get; set; }
        public virtual string TieuDeRex { get; set; }
        public virtual DateTime? NgayTaoDT { get; set; }
        public virtual DateTime? NgaySuaDT { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual string NguoiSua { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
