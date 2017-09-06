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
    public class KhoBaoCaoTheoKyChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoBaoCaoTheoKyChiTietRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<KhoBaoCaoTheoKyChiTiet> Insert(KhoBaoCaoTheoKyChiTiet KyChiTiet)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(KyChiTiet);

                if (KyChiTiet.KyChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KyChiTiet;
            });

        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoBaoCaoTheoKyChiTiet>(new KhoBaoCaoTheoKyChiTiet { KyId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
