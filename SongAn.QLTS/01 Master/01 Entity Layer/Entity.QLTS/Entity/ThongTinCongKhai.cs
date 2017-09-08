/*****************************************************************************
1. Create Date : 2017.09.07
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLTS.Entity.QLTS.Entity
{
    [Table("ThongTinCongKhai")]
    public partial class ThongTinCongKhai
    {
        public virtual int TaiSanId { get; set; }
        public virtual string MoTa { get; set; }
        public virtual string MucDich { get; set; }
        public virtual int? HienTrangSuDungId { get; set; }
        public virtual decimal? DonGia { get; set; }
        public virtual decimal? NopNganSach { get; set; }
        public virtual decimal? DeLaiDonVi { get; set; }
        public virtual decimal? HHCK { get; set; }
        public virtual int? NhaCungCapId { get; set; }
    }
}
