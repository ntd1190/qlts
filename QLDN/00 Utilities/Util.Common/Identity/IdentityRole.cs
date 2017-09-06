/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : role phuc vu login & phan quyen
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SongAn.QLDN.Util.Common.Identity
{
    public class IdentityRole
    {
        public int RoleId { get; set; }

        [Required]
        public string RoleName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<IdentityUser> Users { get; set; }
    }
}