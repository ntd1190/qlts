
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
    public class KhoPhieuNhapSeriesRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuNhapSeriesRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuNhapSeries> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuNhapSeries>(new KhoPhieuNhapSeries { Id = id });

                return obj;
            });
        }
        public async Task<KhoPhieuNhapSeries> Insert(KhoPhieuNhapSeries sr)
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
        public async Task<KhoPhieuNhapSeries> Update(KhoPhieuNhapSeries sr)
        {
            return await WithConnection(async c =>
            {
                KhoPhieuNhapSeries obj = await c.GetAsync(sr);

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
        public async Task<KhoPhieuNhapSeries> UpdatePartial(KhoPhieuNhapSeries sr, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoPhieuNhapSeries obj = await c.GetAsync(sr);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", sr.Id.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuNhapSeries>()
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
                var result = await c.DeleteAsync<KhoPhieuNhapSeries>(new KhoPhieuNhapSeries { Id = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
