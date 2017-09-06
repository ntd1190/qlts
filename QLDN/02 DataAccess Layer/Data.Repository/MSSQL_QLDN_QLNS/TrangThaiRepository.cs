/*****************************************************************************
1. Create Date : 2017.04.15
2. Creator     : Tran Quoc Hung
3. Description : TrangThai Repository
4. History     : 2017.04.15(Tran Quoc Hung) - Tao moi
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
    public class TrangThaiRepository : BaseRepositoryAsync
    {
        public TrangThaiRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<TrangThai> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<TrangThai>(new TrangThai { TrangThaiId = id });

                return obj;
            });
        }

        public async Task<IEnumerable<TrangThai>> GetByChucNang(string chucnang)
        {
            return await WithConnection(async c => {
                var obj = await c.FindAsync<TrangThai>(statement => statement
                        .Where($@"{nameof(TrangThai.ChucNang):C}=@ChucNangParam AND
                                    {nameof(TrangThai.XoaYN):C}='N'")
                        .OrderBy($"{nameof(TrangThai.MaTrangThai):C} ASC")
                        .WithParameters(new { ChucNangParam = chucnang }));

                return obj;
            });
        }

        public async Task<TrangThai> Insert(TrangThai entity)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(entity);

                if (entity.TrangThaiId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return entity;
            });

        }

        public async Task<TrangThai> Update(TrangThai entity)
        {
            return await WithConnection(async c =>
            {
                TrangThai obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.TrangThaiId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.TrangThaiId.ToString()));
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

        public async Task<TrangThai> UpdatePartial(TrangThai entity, params string[] field)
        {
            return await WithConnection(async c =>
            {
                TrangThai obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.TrangThaiId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.TrangThaiId.ToString()));
                }

                entity.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(TrangThai.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<TrangThai>()
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
                var result = await c.DeleteAsync<TrangThai>(new TrangThai { TrangThaiId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
