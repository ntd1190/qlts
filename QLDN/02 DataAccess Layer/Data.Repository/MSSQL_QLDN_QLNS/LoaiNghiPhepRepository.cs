/*****************************************************************************
1. Create Date : 2017.04.15
2. Creator     : Tran Quoc Hung
3. Description : LoaiNghiPhep Repository
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
    public class LoaiNghiPhepRepository : BaseRepositoryAsync
    {
        public LoaiNghiPhepRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<LoaiNghiPhep> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<LoaiNghiPhep>(new LoaiNghiPhep { LoaiNghiPhepId = id });

                return obj;
            });
        }

        public async Task<IEnumerable<LoaiNghiPhep>> GetAll()
        {
            return await WithConnection(async c => {
                var obj = await c.FindAsync<LoaiNghiPhep>(statement => statement
                        .Where($"{nameof(LoaiNghiPhep.XoaYN):C}=@Param1")
                        .OrderBy($"{nameof(LoaiNghiPhep.TenLoaiPhep):C} ASC")
                            .WithParameters(new { Param1 = "N" }));

                return obj;
            });
        }

        public async Task<IEnumerable<LoaiNghiPhep>> GetByMaLoaiNghiPhep(string MaLoaiNghiPhep)
        {
            return await WithConnection(async c => {
                var obj = await c.FindAsync<LoaiNghiPhep>(statement => statement
                        .Where($@"{nameof(LoaiNghiPhep.MaLoaiNghiPhep):C}=@Param1 AND
                                    {nameof(LoaiNghiPhep.XoaYN):C}='N'")
                        .OrderBy($"{nameof(LoaiNghiPhep.TenLoaiPhep):C} ASC")
                            .WithParameters(new { Param1 = MaLoaiNghiPhep }));

                return obj;
            });
        }

        public async Task<LoaiNghiPhep> Insert(LoaiNghiPhep entity)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(entity);

                if (entity.LoaiNghiPhepId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return entity;
            });

        }

        public async Task<LoaiNghiPhep> Update(LoaiNghiPhep entity)
        {
            return await WithConnection(async c =>
            {
                LoaiNghiPhep obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.LoaiNghiPhepId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.LoaiNghiPhepId.ToString()));
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

        public async Task<LoaiNghiPhep> UpdatePartial(LoaiNghiPhep entity, params string[] field)
        {
            return await WithConnection(async c =>
            {
                LoaiNghiPhep obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.LoaiNghiPhepId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.LoaiNghiPhepId.ToString()));
                }

                entity.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(LoaiNghiPhep.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<LoaiNghiPhep>()
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
                var result = await c.DeleteAsync<LoaiNghiPhep>(new LoaiNghiPhep { LoaiNghiPhepId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
