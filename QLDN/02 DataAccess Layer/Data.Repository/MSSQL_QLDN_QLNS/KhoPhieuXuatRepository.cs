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
    public class KhoPhieuXuatRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuXuatRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuXuat> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuXuat>(new KhoPhieuXuat { PhieuXuatId = id });

                return obj;
            });
        }
        public async Task<KhoPhieuXuat> Insert(KhoPhieuXuat kho)
        {
            
            kho.XoaYN = "N";
            kho.NgayTao = kho.NgayTao ?? DateTime.Now;
            kho.NguoiTao = kho.NguoiTao ?? null;
            return await WithConnection(async c =>
            {
                await c.InsertAsync(kho);

                if (kho.PhieuXuatId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return kho;
            });

        }
        public async Task<KhoPhieuXuat> Update(KhoPhieuXuat kho)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(kho);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", kho.PhieuXuatId.ToString()));
                }

                var result = await c.UpdateAsync(kho);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return kho;
            });
        }
        public async Task<KhoPhieuXuat> UpdatePartial(KhoPhieuXuat kho, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                var obj = await c.GetAsync(kho);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", kho.PhieuXuatId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuXuat>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(kho, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return kho;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoPhieuXuat>(new KhoPhieuXuat { PhieuXuatId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
