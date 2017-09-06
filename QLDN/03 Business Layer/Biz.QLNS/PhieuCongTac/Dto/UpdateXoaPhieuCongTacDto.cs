using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.PhieuCongTac.Dto
{
    public class UpdateXoaPhieuCongTacDto : Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac
    {
        public int PCT_CTRVERSION { get; set; }
        public int PCT_ID { get; set; }
    }
}
