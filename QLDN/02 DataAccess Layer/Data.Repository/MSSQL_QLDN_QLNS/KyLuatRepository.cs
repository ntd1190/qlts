using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class KyLuatRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KyLuatRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KyLuat> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KyLuat>(new KyLuat { KyLuatId = id });

                return obj;
            });
        }
        public async Task<KyLuat> Insert(KyLuat khenthuong)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(khenthuong);

                if (khenthuong.KyLuatId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return khenthuong;
            });

        }
        public async Task<KyLuat> Update(KyLuat khenthuong)
        {
            return await WithConnection(async c =>
            {
                KyLuat obj = await c.GetAsync(khenthuong);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khenthuong.KyLuatId.ToString()));
                }

                if (obj.CtrVersion != khenthuong.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khenthuong.KyLuatId.ToString()));
                }

                khenthuong.CtrVersion += 1;

                var result = await c.UpdateAsync(khenthuong);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return khenthuong;
            });
        }
        public async Task<KyLuat> UpdatePartial(KyLuat khenthuong, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KyLuat obj = await c.GetAsync(khenthuong);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khenthuong.KyLuatId.ToString()));
                }

                if (obj.CtrVersion != khenthuong.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khenthuong.KyLuatId.ToString()));
                }

                khenthuong.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(khenthuong.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KyLuat>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(khenthuong, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return khenthuong;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KyLuat>(new KyLuat { KyLuatId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
