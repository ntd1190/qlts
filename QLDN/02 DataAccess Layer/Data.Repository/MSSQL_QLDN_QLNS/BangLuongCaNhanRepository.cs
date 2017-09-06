/*****************************************************************************
1. Create Date : 2017.05.10
2. Creator     : Tran Quoc Hung
3. Description : BangLuongCaNhan Repository
4. History     : 2017.05.10(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class BangLuongCaNhanRepository : BaseRepositoryAsync
    {
        public BangLuongCaNhanRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<BangLuongCaNhan> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<BangLuongCaNhan>(new BangLuongCaNhan { BangLuongCaNhanId = id });

                return obj;
            });
        }

        public async Task<IEnumerable<BangLuongCaNhan>> GetByBangLuongId(string BangLuongId)
        {
            return await WithConnection(async c => {
                var obj = await c.FindAsync<BangLuongCaNhan>(statement => statement
                        .Where($@"{nameof(BangLuongCaNhan.BangLuongId):C}=@Param1 AND
                                    { nameof(BangLuongCaNhan.XoaYN):C}='N'")
                        .OrderBy($"{nameof(BangLuongCaNhan.ThangNam):C} DESC")
                            .WithParameters(new { Param1 = BangLuongId }));

                return obj;
            });
        }

        public async Task<BangLuongCaNhan> Insert(BangLuongCaNhan entity)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(entity);

                if (entity.BangLuongCaNhanId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return entity;
            });

        }

        public async Task<BangLuongCaNhan> Update(BangLuongCaNhan entity)
        {
            return await WithConnection(async c =>
            {
                BangLuongCaNhan obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.BangLuongCaNhanId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.BangLuongCaNhanId.ToString()));
                }

                entity.CtrVersion += 1;

                var result = await c.UpdateAsync(entity);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return entity;
            });
        }

        public async Task<BangLuongCaNhan> UpdatePartial(BangLuongCaNhan entity, params string[] field)
        {
            return await WithConnection(async c =>
            {
                BangLuongCaNhan obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.BangLuongCaNhanId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.BangLuongCaNhanId.ToString()));
                }

                entity.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(BangLuongCaNhan.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<BangLuongCaNhan>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(entity, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return entity;
            });
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<BangLuongCaNhan>(new BangLuongCaNhan { BangLuongCaNhanId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
