/*****************************************************************************
1. Create Date  : 2017.06.12
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUNHAPKHO/LIST
4. Description  : 
5. History      : 2017.06.12 (NGUYỄN THANH BÌNH) - Tao moi
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
    public class KhoPhieuNhapChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuNhapChiTietRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuNhapChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuNhapChiTiet>(new KhoPhieuNhapChiTiet { PhieuNhapChiTietId = id });

                return obj;
            });
        }
        public async Task<KhoPhieuNhapChiTiet> Insert(KhoPhieuNhapChiTiet obj)
        {
            
            obj.XoaYN = "N";
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.PhieuNhapChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }
        public async Task<KhoPhieuNhapChiTiet> Update(KhoPhieuNhapChiTiet obj)
        {
            return await WithConnection(async c =>
            {
                var objCheck = await c.GetAsync(obj);

                if (objCheck == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuNhapChiTietId.ToString()));
                }

                var result = await c.UpdateAsync(obj);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return obj;
            });
        }
        public async Task<KhoPhieuNhapChiTiet> UpdatePartial(KhoPhieuNhapChiTiet obj, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                var objCheck = await c.GetAsync(obj);

                if (objCheck == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuNhapChiTietId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuNhapChiTiet>()
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
                var result = await c.DeleteAsync<KhoPhieuNhapChiTiet>(new KhoPhieuNhapChiTiet { PhieuNhapChiTietId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
