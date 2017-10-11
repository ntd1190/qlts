using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.Repository.QLTS
{
    public class LapBaoCaoRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public LapBaoCaoRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<LapBaoCao> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<LapBaoCao>(new LapBaoCao { LapBaoCaoId = id });

                return obj;
            });
        }
        public async Task<LapBaoCao> Insert(LapBaoCao LapBaoCao)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(LapBaoCao);

                if (LapBaoCao.LapBaoCaoId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return LapBaoCao;
            });

        }
        public async Task<LapBaoCao> Update(LapBaoCao LapBaoCao)
        {
            return await WithConnection(async c =>
            {
                LapBaoCao obj = await c.GetAsync(LapBaoCao);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LapBaoCao.LapBaoCaoId.ToString()));
                }

                var result = await c.UpdateAsync(LapBaoCao);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LapBaoCao;
            });
        }
        public async Task<LapBaoCao> UpdatePartial(LapBaoCao LapBaoCao, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                LapBaoCao obj = await c.GetAsync(LapBaoCao);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LapBaoCao.LapBaoCaoId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<LapBaoCao>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(LapBaoCao, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LapBaoCao;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<LapBaoCao>(new LapBaoCao { LapBaoCaoId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

    }
}
