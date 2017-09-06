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
    public class KhoHangHoaRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoHangHoaRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoHangHoa> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoHangHoa>(new KhoHangHoa {HangHoaId = id });

                return obj;
            });
        }
        public async Task<KhoHangHoa> Insert(KhoHangHoa khachhang)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(khachhang);

                if (khachhang.HangHoaId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return khachhang;
            });

        }
        public async Task<KhoHangHoa> Update(KhoHangHoa khachhang)
        {
            return await WithConnection(async c =>
            {
               KhoHangHoa obj = await c.GetAsync(khachhang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khachhang.HangHoaId.ToString()));
                }

                var result = await c.UpdateAsync(khachhang);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return khachhang;
            });
        }
        public async Task<KhoHangHoa> UpdatePartial(KhoHangHoa khachhang, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
               KhoHangHoa obj = await c.GetAsync(khachhang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khachhang.HangHoaId.ToString()));
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoHangHoa>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(khachhang, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return khachhang;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoHangHoa>(new KhoHangHoa {HangHoaId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
