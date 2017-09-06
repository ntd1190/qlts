/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : NhanVienRepository
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class BaoHiemXaHoiRepository : BaseRepositoryAsync
    {
        public BaoHiemXaHoiRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<BaoHiemXaHoi> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<BaoHiemXaHoi>(new BaoHiemXaHoi { BaoHiemXaHoiId = id });

                return obj;
            });
        }

        public async Task<BaoHiemXaHoi> Insert(BaoHiemXaHoi entity)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(entity);

                if (entity.NhanVienId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return entity;
            });

        }

        public async Task<BaoHiemXaHoi> Update(BaoHiemXaHoi entity)
        {
            return await WithConnection(async c =>
            {
                BaoHiemXaHoi obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.NhanVienId.ToString()));
                }

                if (obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.NhanVienId.ToString()));
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


        public async Task<BaoHiemXaHoi> UpdatePartialBase(BaoHiemXaHoi entity, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                BaoHiemXaHoi obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.BaoHiemXaHoiId.ToString()));
                }

                if (checkCtrVersion == true && obj.CtrVersion != entity.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , entity.BaoHiemXaHoiId.ToString()));
                }

                entity.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(BaoHiemXaHoi.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<BaoHiemXaHoi>()
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
        public async Task<BaoHiemXaHoi> UpdatePartial(BaoHiemXaHoi entity, params string[] field)
        {
            return await UpdatePartialBase(entity, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<BaoHiemXaHoi>(new BaoHiemXaHoi { BaoHiemXaHoiId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
