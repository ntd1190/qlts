using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("BaoDuong")]
    public class BaoDuong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BaoDuongId { get; set; }
        public virtual int TaiSanId { get; set; }
        public virtual int PhongBanId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual DateTime NgayBaoDuong { get; set; }
        public virtual DateTime NgayDuKien { get; set; }
        public virtual decimal DuToan { get; set; }
        public virtual int LoaiBaoDuongId { get; set; }
        public virtual string MoTa { get; set; }
        public virtual int DuyetId { get; set; }
        public virtual int NguoiDuyet { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
