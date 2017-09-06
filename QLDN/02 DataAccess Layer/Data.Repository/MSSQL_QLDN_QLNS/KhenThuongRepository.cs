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
    public class KhenThuongRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhenThuongRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhenThuong> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhenThuong>(new KhenThuong { KhenThuongId = id });

                return obj;
            });
        }
        public async Task<KhenThuong> Insert(KhenThuong khenthuong)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(khenthuong);

                if (khenthuong.KhenThuongId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return khenthuong;
            });

        }
        public async Task<KhenThuong> Update(KhenThuong khenthuong)
        {
            return await WithConnection(async c =>
            {
                KhenThuong obj = await c.GetAsync(khenthuong);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khenthuong.KhenThuongId.ToString()));
                }

                if (obj.CtrVersion != khenthuong.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khenthuong.KhenThuongId.ToString()));
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
        public async Task<KhenThuong> UpdatePartial(KhenThuong khenthuong, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhenThuong obj = await c.GetAsync(khenthuong);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khenthuong.KhenThuongId.ToString()));
                }

                if (obj.CtrVersion != khenthuong.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khenthuong.KhenThuongId.ToString()));
                }

                khenthuong.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(khenthuong.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhenThuong>()
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
                var result = await c.DeleteAsync<KhenThuong>(new KhenThuong { KhenThuongId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
