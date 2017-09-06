/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : NhanVienRepository
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
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
    public class QuaTrinhCongTacRepository : BaseRepositoryAsync
    {
        public QuaTrinhCongTacRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<QuaTrinhCongTac> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<QuaTrinhCongTac>(new QuaTrinhCongTac { NhanVienId = id });

                return obj;
            });
        }

        public async Task<QuaTrinhCongTac> Insert(QuaTrinhCongTac obj)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.QuaTrinhCongTacId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }

        public async Task<QuaTrinhCongTac> Update(QuaTrinhCongTac model)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(model);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", model.QuaTrinhCongTacId.ToString()));
                }

                if (obj.CtrVersion != model.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , model.QuaTrinhCongTacId.ToString()));
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


        public async Task<QuaTrinhCongTac> UpdatePartialBase(QuaTrinhCongTac model, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(model);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", model.QuaTrinhCongTacId.ToString()));
                }

                if (checkCtrVersion == true && obj.CtrVersion != model.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , model.QuaTrinhCongTacId.ToString()));
                }

                model.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(QuaTrinhCongTac.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<QuaTrinhCongTac>()
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
        public async Task<QuaTrinhCongTac> UpdatePartial(QuaTrinhCongTac model, params string[] field)
        {
            return await UpdatePartialBase(model, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<QuaTrinhCongTac>(new QuaTrinhCongTac { QuaTrinhCongTacId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
