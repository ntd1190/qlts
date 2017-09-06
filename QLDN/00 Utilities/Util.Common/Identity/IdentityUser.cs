/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : user phuc vu login & phan quyen
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SongAn.QLDN.Util.Common.Identity
{
    public class IdentityUser
    {
        public int UserId { get; set; }

        public string UserCode { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string Name { get; set; }

        public string NhanVienId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreateDate { get; set; }

        public string [] Roles { get; set; }

        public string [] FunctionCodes { get; set; } 

        public string ApiToken { get; set; }
    }
}