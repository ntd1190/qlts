using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    [Table("KhoBaoCaoTheoKy")]
    public partial class KhoBaoCaoTheoKy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KyId { get; set; }
        public virtual int KyTruoc { get; set; }
        public virtual string Ten { get; set; }
        public virtual DateTime ThangNam { get; set; }
        public virtual int KhoHangId { get; set; }
        public virtual DateTime NgayBatDau { get; set; }
        public virtual DateTime NgayKetThuc { get; set; }
        public virtual Int16 LoaiBaoCao { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrlVersion { get; set; }
        public virtual string MaTrangThai { get; set; }
    }
}
