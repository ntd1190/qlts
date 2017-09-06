using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class KhoLuocSuRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoLuocSuRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoLuocSu> Insert(KhoLuocSu ls)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(ls);

                if (ls.LuocSuId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return ls;
            });

        }


    }
}
