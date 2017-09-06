/*****************************************************************************
1. Create Date : 2017.05.08
2. Creator     : Nguyen Thanh Binh
3. Description : PhieuCongTacRepository
4. History     : 2017.05.08(Nguyen Thanh Binh) - Tao moi
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
    public class PhieuCongTacRepository : BaseRepositoryAsync
    {
        public PhieuCongTacRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<PhieuCongTac> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<PhieuCongTac>(new PhieuCongTac { PhieuCongTacId = id });

                return obj;
            });
        }

        public async Task<PhieuCongTac> Insert(PhieuCongTac obj)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.PhieuCongTacId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }

        public async Task<PhieuCongTac> Update(PhieuCongTac obj)
        {
            return await WithConnection(async c =>
            {
                PhieuCongTac updateObj = await c.GetAsync(obj);

                if (updateObj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuCongTacId.ToString()));
                }

                if (updateObj.CtrVersion != obj.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , obj.PhieuCongTacId.ToString()));
                }

                obj.CtrVersion += 1;

                var result = await c.UpdateAsync(obj);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return obj;
            });
        }


        public async Task<PhieuCongTac> UpdatePartialBase(PhieuCongTac obj, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                PhieuCongTac updateObj = await c.GetAsync(obj);

                if (updateObj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuCongTacId.ToString()));
                }

                if (checkCtrVersion == true && updateObj.CtrVersion != obj.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , obj.PhieuCongTacId.ToString()));
                }

                obj.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(PhieuCongTac.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<PhieuCongTac>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(obj, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return obj;
            });
        }
        public async Task<PhieuCongTac> UpdatePartial(PhieuCongTac obj, params string[] field)
        {
            return await UpdatePartialBase(obj, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<PhieuCongTac>(new PhieuCongTac { PhieuCongTacId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
