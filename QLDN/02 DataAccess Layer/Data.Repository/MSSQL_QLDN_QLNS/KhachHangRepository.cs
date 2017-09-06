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
    public class KhachHangRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhachHangRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhachHang> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhachHang>(new KhachHang {KhachHangId = id });

                return obj;
            });
        }
        public async Task<KhachHang> Insert(KhachHang khachhang)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(khachhang);

                if (khachhang.KhachHangId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return khachhang;
            });

        }
        public async Task<KhachHang> Update(KhachHang khachhang)
        {
            return await WithConnection(async c =>
            {
               KhachHang obj = await c.GetAsync(khachhang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khachhang.KhachHangId.ToString()));
                }

                if (obj.CtrVersion != khachhang.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khachhang.KhachHangId.ToString()));
                }

                khachhang.CtrVersion += 1;

                var result = await c.UpdateAsync(khachhang);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return khachhang;
            });
        }
        public async Task<KhachHang> UpdatePartial(KhachHang khachhang, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
               KhachHang obj = await c.GetAsync(khachhang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khachhang.KhachHangId.ToString()));
                }

                if (obj.CtrVersion != khachhang.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khachhang.KhachHangId.ToString()));
                }

                khachhang.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(khachhang.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhachHang>()
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
                var result = await c.DeleteAsync<KhachHang>(new KhachHang {KhachHangId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
