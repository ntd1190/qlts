/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : dto luu du lieu principal
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SongAn.QLTS.Util.Common.Identity
{
    public class CustomPrincipalSerializeModel
    {
        public int UserId { get; set; }
        public string UserCode { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
        public string[] Roles { get; set; }
        public string[] FunctionCodes { get; set; }
        public string ApiToken { get; set; }
    }
}