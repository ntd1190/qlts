using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.LuongPhuCap.Dto
{
  public   class GetLuongPhuCapByNhanVienIdDto: Entity.MSSQL_QLDN_QLNS.Entity.LuongPhuCap
    {
        public int MAXCNT { get; set; }
        public int LPC_ID { get; set; }
        public int LPC_CTRVERSION { get; set; }
    }
}
