/*****************************************************************************
1. Create Date : 2017.05.08
2. Creator     : Tran Quoc Hung
3. Description : BangLuong Repository
4. History     : 2017.05.08(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class BangLuongRepository : BaseRepositoryAsync
    {
        public BangLuongRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<BangLuong> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<BangLuong>(new BangLuong { BangLuongId = id });

                return obj;
            });
        }

        public async Task<BangLuong> Insert(BangLuong entity)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(entity);

                if (entity.BangLuongId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return entity;
            });

        }

        public async Task<BangLuong> Update(BangLuong entity)
        {
            return await WithConnection(async c =>
            {
                BangLuong obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.BangLuongId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.BangLuongId.ToString()));
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

        public async Task<BangLuong> UpdatePartial(BangLuong entity, params string[] field)
        {
            return await WithConnection(async c =>
            {
                BangLuong obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.BangLuongId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.BangLuongId.ToString()));
                }

                entity.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(BangLuong.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<BangLuong>()
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
                var result = await c.DeleteAsync<BangLuong>(new BangLuong { BangLuongId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
