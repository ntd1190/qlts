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
    public class GhiGiamRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public GhiGiamRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<GhiGiam> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<GhiGiam>(new GhiGiam { GhiGiamId = id });

                return obj;
            });
        }
        public async Task<GhiGiam> Insert(GhiGiam GhiGiam)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(GhiGiam);

                if (GhiGiam.GhiGiamId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return GhiGiam;
            });

        }
        public async Task<GhiGiam> Update(GhiGiam GhiGiam)
        {
            return await WithConnection(async c =>
            {
                GhiGiam obj = await c.GetAsync(GhiGiam);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", GhiGiam.GhiGiamId.ToString()));
                }

                if (obj.CtrVersion != GhiGiam.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , GhiGiam.GhiGiamId.ToString()));
                }

                GhiGiam.CtrVersion += 1;

                var result = await c.UpdateAsync(GhiGiam);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return GhiGiam;
            });
        }
        public async Task<GhiGiam> UpdatePartial(GhiGiam GhiGiam, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                GhiGiam obj = await c.GetAsync(GhiGiam);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", GhiGiam.GhiGiamId.ToString()));
                }

                if (obj.CtrVersion != GhiGiam.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , GhiGiam.GhiGiamId.ToString()));
                }

                GhiGiam.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(GhiGiam.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<GhiGiam>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(GhiGiam, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return GhiGiam;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<GhiGiam>(new GhiGiam { GhiGiamId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

    }
}
