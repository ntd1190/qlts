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
    public class LuongPhuCapRepository : BaseRepositoryAsync
    {
        public LuongPhuCapRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<LuongPhuCap> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<LuongPhuCap>(new LuongPhuCap { NhanVienId = id });

                return obj;
            });
        }

        public async Task<LuongPhuCap> Insert(LuongPhuCap obj)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.LuongPhuCapId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }

        public async Task<LuongPhuCap> Update(LuongPhuCap model)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(model);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", model.LuongPhuCapId.ToString()));
                }

                if (obj.CtrVersion != model.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , model.LuongPhuCapId.ToString()));
                }

                model.CtrVersion += 1;

                var result = await c.UpdateAsync(model);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return model;
            });
        }


        public async Task<LuongPhuCap> UpdatePartialBase(LuongPhuCap model, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(model);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", model.LuongPhuCapId.ToString()));
                }

                if (checkCtrVersion == true && obj.CtrVersion != model.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , model.LuongPhuCapId.ToString()));
                }

                model.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(LuongPhuCap.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<LuongPhuCap>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(model, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return model;
            });
        }
        public async Task<LuongPhuCap> UpdatePartial(LuongPhuCap model, params string[] field)
        {
            return await UpdatePartialBase(model, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<LuongPhuCap>(new LuongPhuCap { LuongPhuCapId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
