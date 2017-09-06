/*****************************************************************************
1. Create Date  : 2017.06.29
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUXUAT/LIST
4. Description  : 
5. History      : 2017.06.29 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class KhoPhieuXuatChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuXuatChiTietRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuXuatChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuXuatChiTiet>(new KhoPhieuXuatChiTiet { PhieuXuatChiTietId = id });

                return obj;
            });
        }
        public async Task<KhoPhieuXuatChiTiet> Insert(KhoPhieuXuatChiTiet obj)
        {
            
            obj.XoaYN = "N";
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.PhieuXuatChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }
        public async Task<KhoPhieuXuatChiTiet> Update(KhoPhieuXuatChiTiet obj)
        {
            return await WithConnection(async c =>
            {
                var objCheck = await c.GetAsync(obj);

                if (objCheck == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuXuatChiTietId.ToString()));
                }

                var result = await c.UpdateAsync(obj);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return obj;
            });
        }
        public async Task<KhoPhieuXuatChiTiet> UpdatePartial(KhoPhieuXuatChiTiet obj, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                var objCheck = await c.GetAsync(obj);

                if (objCheck == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuXuatChiTietId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuXuatChiTiet>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(obj, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return obj;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoPhieuXuatChiTiet>(new KhoPhieuXuatChiTiet { PhieuXuatChiTietId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
