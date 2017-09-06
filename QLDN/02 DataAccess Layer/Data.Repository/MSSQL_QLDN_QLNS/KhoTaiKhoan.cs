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
    public class KhoTaiKhoanRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoTaiKhoanRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoTaiKhoan> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoTaiKhoan>(new KhoTaiKhoan { TaiKhoanId = id });

                return obj;
            });
        }
        public async Task<KhoTaiKhoan> Insert(KhoTaiKhoan nuocsx)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(nuocsx);

                if (nuocsx.TaiKhoanId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return nuocsx;
            });

        }
        public async Task<KhoTaiKhoan> Update(KhoTaiKhoan nuocsx)
        {
            return await WithConnection(async c =>
            {
                KhoTaiKhoan obj = await c.GetAsync(nuocsx);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nuocsx.TaiKhoanId.ToString()));
                }

                var result = await c.UpdateAsync(nuocsx);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nuocsx;
            });
        }
        public async Task<KhoTaiKhoan> UpdatePartial(KhoTaiKhoan nuocsx, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoTaiKhoan obj = await c.GetAsync(nuocsx);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nuocsx.TaiKhoanId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoTaiKhoan>()
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
                var result = await c.DeleteAsync<KhoTaiKhoan>(new KhoTaiKhoan { TaiKhoanId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
