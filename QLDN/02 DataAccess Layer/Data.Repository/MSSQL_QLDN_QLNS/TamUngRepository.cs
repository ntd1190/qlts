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
    public class TamUngRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public TamUngRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<TamUng> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<TamUng>(new TamUng { TamUngId = id });

                return obj;
            });
        }
        public async Task<TamUng> Insert(TamUng tamung)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(tamung);

                if (tamung.TamUngId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return tamung;
            });

        }
        public async Task<TamUng> Update(TamUng tamung)
        {
            return await WithConnection(async c =>
            {
                TamUng obj = await c.GetAsync(tamung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", tamung.TamUngId.ToString()));
                }

                if (obj.CtrVersion != tamung.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , tamung.TamUngId.ToString()));
                }

                tamung.CtrVersion += 1;

                var result = await c.UpdateAsync(tamung);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return tamung;
            });
        }
        public async Task<TamUng> UpdatePartial(TamUng tamung, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                TamUng obj = await c.GetAsync(tamung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", tamung.TamUngId.ToString()));
                }

                if (obj.CtrVersion != tamung.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , tamung.TamUngId.ToString()));
                }

                tamung.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(tamung.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<TamUng>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(tamung, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return tamung;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<TamUng>(new TamUng { TamUngId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
