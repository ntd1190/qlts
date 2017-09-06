/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : Dto chua du lieu token tra ve tu api
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Util.Common.Dto
{
    public class ReturnTokenDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string[] Roles { get; set; }
        public string ApiToken { get; set; }
        public string[] FunctionCodes { get; set; }
    }
}
