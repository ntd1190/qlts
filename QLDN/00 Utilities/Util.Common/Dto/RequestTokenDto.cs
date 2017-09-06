/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : Dto goi du lieu len api de chung thuc
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Util.Common.Dto
{
    public class RequestTokenDto
    {
        public string email { get; set; }
        public string password { get; set; }
        public string grant_type { get; set; }
        public string device_id { get; set; }
        public string client_id { get; set; }
    }
}
