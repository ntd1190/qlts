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
    public class KhoHangSanXuatRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoHangSanXuatRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoHangSanXuat> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoHangSanXuat>(new KhoHangSanXuat { HangSanXuatId = id });

                return obj;
            });
        }
        public async Task<KhoHangSanXuat> Insert(KhoHangSanXuat nuocsx)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(nuocsx);

                if (nuocsx.HangSanXuatId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return nuocsx;
            });

        }
        public async Task<KhoHangSanXuat> Update(KhoHangSanXuat nuocsx)
        {
            return await WithConnection(async c =>
            {
                KhoHangSanXuat obj = await c.GetAsync(nuocsx);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nuocsx.HangSanXuatId.ToString()));
                }

                var result = await c.UpdateAsync(nuocsx);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nuocsx;
            });
        }
        public async Task<KhoHangSanXuat> UpdatePartial(KhoHangSanXuat nuocsx, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoHangSanXuat obj = await c.GetAsync(nuocsx);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nuocsx.HangSanXuatId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoHangSanXuat>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(nuocsx, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nuocsx;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoHangSanXuat>(new KhoHangSanXuat { HangSanXuatId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
