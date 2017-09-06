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
    public class KhoPhieuSeriesRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuSeriesRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuSeries> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuSeries>(new KhoPhieuSeries { Id = id });

                return obj;
            });
        }
        public async Task<KhoPhieuSeries> Insert(KhoPhieuSeries sr)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(sr);

                if (sr.Id == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return sr;
            });

        }
        public async Task<KhoPhieuSeries> Update(KhoPhieuSeries sr)
        {
            return await WithConnection(async c =>
            {
                KhoPhieuSeries obj = await c.GetAsync(sr);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", sr.Id.ToString()));
                }

                var result = await c.UpdateAsync(sr);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return sr;
            });
        }
        public async Task<KhoPhieuSeries> UpdatePartial(KhoPhieuSeries sr, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoPhieuSeries obj = await c.GetAsync(sr);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", sr.Id.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuSeries>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(sr, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return sr;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoPhieuSeries>(new KhoPhieuSeries { Id = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
