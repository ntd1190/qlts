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
    public class KhoPhieuThuRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuThuRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuThu> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuThu>(new KhoPhieuThu {PhieuThuId = id });

                return obj;
            });
        }
        public async Task<KhoPhieuThu> Insert(KhoPhieuThu khachhang)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(khachhang);

                if (khachhang.PhieuThuId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return khachhang;
            });

        }
        public async Task<KhoPhieuThu> Update(KhoPhieuThu khachhang)
        {
            return await WithConnection(async c =>
            {
               KhoPhieuThu obj = await c.GetAsync(khachhang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khachhang.PhieuThuId.ToString()));
                }

                var result = await c.UpdateAsync(khachhang);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return khachhang;
            });
        }
        public async Task<KhoPhieuThu> UpdatePartial(KhoPhieuThu khachhang, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
               KhoPhieuThu obj = await c.GetAsync(khachhang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khachhang.PhieuThuId.ToString()));
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuThu>()
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
                var result = await c.DeleteAsync<KhoPhieuThu>(new KhoPhieuThu {PhieuThuId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
