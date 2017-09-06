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
    public class PhieuCongTacChiTietRepository : BaseRepositoryAsync
    {
        public PhieuCongTacChiTietRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<PhieuCongTacChiTiet> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<PhieuCongTacChiTiet>(new PhieuCongTacChiTiet { PhieuCongTacId = id });

                return obj;
            });
        }

        public async Task<PhieuCongTacChiTiet> Insert(PhieuCongTacChiTiet obj)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.PhieuCongTacChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }

        public async Task<PhieuCongTacChiTiet> Update(PhieuCongTacChiTiet obj)
        {
            return await WithConnection(async c =>
            {
                var updateObj = await c.GetAsync(obj);

                if (updateObj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuCongTacChiTietId.ToString()));
                }

                if (updateObj.CtrVersion != obj.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , obj.PhieuCongTacChiTietId.ToString()));
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


        public async Task<PhieuCongTacChiTiet> UpdatePartialBase(PhieuCongTacChiTiet obj, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                var updateObj = await c.GetAsync(obj);

                if (updateObj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuCongTacChiTietId.ToString()));
                }

                if (checkCtrVersion == true && updateObj.CtrVersion != obj.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , obj.PhieuCongTacChiTietId.ToString()));
                }

                obj.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(PhieuCongTacChiTiet.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<PhieuCongTacChiTiet>()
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
        public async Task<PhieuCongTacChiTiet> UpdatePartial(PhieuCongTacChiTiet obj, params string[] field)
        {
            return await UpdatePartialBase(obj, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<PhieuCongTacChiTiet>(new PhieuCongTacChiTiet { PhieuCongTacId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
