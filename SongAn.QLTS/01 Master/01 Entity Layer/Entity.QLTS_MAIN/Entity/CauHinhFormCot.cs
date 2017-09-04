/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : CauHinhFormCot entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS_MAIN.Entity
{
    /// <summary>
    /// A class which represents the CauHinhFormCot table.
    /// </summary>
    [Table("CauHinhFormCot")]
    public partial class CauHinhFormCot
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int CauHinhFormCotId { get; set; }
        public virtual string MaForm { get; set; }
        public virtual string MaCot { get; set; }
        public virtual string TenCot { get; set; }
        public virtual string TenCotMacDinh { get; set; }
        public virtual bool HienThiYN { get; set; }
        public virtual bool MacDinhYN { get; set; }
        public virtual bool LaCongThucYN { get; set; }
        public virtual string CongThuc { get; set; }
        public virtual string CauSapXep { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int? DoRong { get; set; }
        public virtual string CauSelect { get; set; }
        public virtual short? ThuTu { get; set; }
        public virtual string TenCotMacDinhRex { get; set; }
        public virtual DateTime? NgayTaoDT { get; set; }
        public virtual DateTime? NgaySuaDT { get; set; }
        public virtual string NguoiTao { get; set; }
        public virtual string NguoiSua { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
