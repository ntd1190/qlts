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
    public class KhoKhachHangRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoKhachHangRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoKhachHang> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoKhachHang>(new KhoKhachHang {KhachHangId = id });

                return obj;
            });
        }
        public async Task<KhoKhachHang> Insert(KhoKhachHang khachhang)
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
        public async Task<KhoKhachHang> Update(KhoKhachHang khachhang)
        {
            return await WithConnection(async c =>
            {
               KhoKhachHang obj = await c.GetAsync(khachhang);

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
        public async Task<KhoKhachHang> UpdatePartial(KhoKhachHang khachhang, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
               KhoKhachHang obj = await c.GetAsync(khachhang);

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
                    .GetDefaultEntityMapping<KhoKhachHang>()
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
                var result = await c.DeleteAsync<KhoKhachHang>(new KhoKhachHang {KhachHangId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
