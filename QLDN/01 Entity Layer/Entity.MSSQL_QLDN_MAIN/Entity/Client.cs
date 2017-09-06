/*****************************************************************************
1. Create Date : 2017.04.08
2. Creator     : Tran Quoc Hung
3. Description : Client entity
4. History     : 2017.04.08(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity
{
    /// <summary>
    /// A class which represents the Client table.
    /// </summary>
	[Table("Client")]
    public partial class Client
    {
        [Key]
        public virtual string ClientId { get; set; }
        public virtual string Base64Secret { get; set; }
        public virtual string Name { get; set; }
        public virtual int ApplicationType { get; set; }
        public virtual bool ActiveYN { get; set; }
        public virtual int RefreshTokenLifeTime { get; set; }
        public virtual string AllowedOrigin { get; set; }
        public virtual string Description { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
