/*****************************************************************************
1. Create Date : 2017.05.22
2. Creator     : Nguyen Thanh Binh
3. Description : QuanLyHopDongRepository
4. History     : 2017.05.22(Nguyen Thanh Binh) - Tao moi
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
    public class QuanLyHopDongRepository : BaseRepositoryAsync
    {
        public QuanLyHopDongRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<QuanLyHopDong> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<QuanLyHopDong>(new QuanLyHopDong { NhanVienId = id });

                return obj;
            });
        }

        public async Task<QuanLyHopDong> Insert(QuanLyHopDong obj)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.QuanLyHopDongId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }

        public async Task<QuanLyHopDong> Update(QuanLyHopDong model)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(model);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", model.QuanLyHopDongId.ToString()));
                }

                if (obj.CtrVersion != model.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , model.QuanLyHopDongId.ToString()));
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


        public async Task<QuanLyHopDong> UpdatePartialBase(QuanLyHopDong model, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(model);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", model.QuanLyHopDongId.ToString()));
                }

                if (checkCtrVersion == true && obj.CtrVersion != model.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , model.QuanLyHopDongId.ToString()));
                }

                model.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(QuanLyHopDong.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<QuanLyHopDong>()
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
        public async Task<QuanLyHopDong> UpdatePartial(QuanLyHopDong model, params string[] field)
        {
            return await UpdatePartialBase(model, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<QuanLyHopDong>(new QuanLyHopDong { QuanLyHopDongId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
