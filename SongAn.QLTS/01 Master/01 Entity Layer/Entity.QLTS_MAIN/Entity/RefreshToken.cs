/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : RefreshToken entity
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLTS.Entity.QLTS_MAIN.Entity
{
    /// <summary>
    /// A class which represents the RefreshToken table.
    /// </summary>
	[Table("RefreshToken")]
    public partial class RefreshToken
    {
        [Key]
        public virtual string RefreshTokenId { get; set; }
        public virtual string Subject { get; set; }
        public virtual string ClientId { get; set; }
        public virtual DateTime IssuedUtc { get; set; }
        public virtual DateTime ExpiresUtc { get; set; }
        public virtual string ProtectedTicket { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
