using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class KhoKiemKeRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoKiemKeRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoKiemKe> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<KhoKiemKe>(new KhoKiemKe { KiemKeId = id });

                return obj;
            });
        }
        public async Task<KhoKiemKe> Insert(KhoKiemKe kiemke)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(kiemke);

                if (kiemke.KiemKeId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return kiemke;
            });

        }
        public async Task<KhoKiemKe> Update(KhoKiemKe kiemke)
        {
            return await WithConnection(async c =>
            {
                KhoKiemKe obj = await c.GetAsync(kiemke);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", kiemke.KiemKeId.ToString()));
                }

                var result = await c.UpdateAsync(kiemke);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return kiemke;
            });
        }
        public async Task<KhoKiemKe> UpdatePartial(KhoKiemKe kiemke, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoKiemKe obj = await c.GetAsync(kiemke);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", kiemke.KiemKeId.ToString()));
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoKiemKe>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(kiemke, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return kiemke;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoKiemKe>(new KhoKiemKe { KiemKeId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
