using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Repository.QLKD
{
    public class NhanVienChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NhanVienChiTietRepository(ContextDto context) : base(context.dbQLKDConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KDNhanVienChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KDNhanVienChiTiet>(new KDNhanVienChiTiet { NhanVienId = id });

                return obj;
            });
        }
        public async Task<KDNhanVienChiTiet> Insert(KDNhanVienChiTiet NhanVienChiTiet)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NhanVienChiTiet);

                if (NhanVienChiTiet.NhanVienId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NhanVienChiTiet;
            });

        }
        public async Task<KDNhanVienChiTiet> Update(KDNhanVienChiTiet KDNhanVienChiTiet)
        {
            return await WithConnection(async c =>
            {
                KDNhanVienChiTiet obj = await c.GetAsync(KDNhanVienChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KDNhanVienChiTiet.NhanVienId.ToString()));
                }

                var result = await c.UpdateAsync(KDNhanVienChiTiet);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KDNhanVienChiTiet;
            });
        }
        public async Task<KDNhanVienChiTiet> UpdatePartial(KDNhanVienChiTiet KDNhanVienChiTiet, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KDNhanVienChiTiet obj = await c.GetAsync(KDNhanVienChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KDNhanVienChiTiet.NhanVienId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KDNhanVienChiTiet>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KDNhanVienChiTiet, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KDNhanVienChiTiet;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KDNhanVienChiTiet>(new KDNhanVienChiTiet { NhanVienId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
