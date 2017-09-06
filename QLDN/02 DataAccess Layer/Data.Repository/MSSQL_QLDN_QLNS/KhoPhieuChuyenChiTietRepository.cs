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
    public class KhoPhieuChuyenChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoPhieuChuyenChiTietRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoPhieuChuyenChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoPhieuChuyenChiTiet>(new KhoPhieuChuyenChiTiet { PhieuChuyenChiTietId = id });

                return obj;
            });
        }
        public async Task<KhoPhieuChuyenChiTiet> Insert(KhoPhieuChuyenChiTiet obj)
        {
            
            obj.XoaYN = "N";
            return await WithConnection(async c =>
            {
                await c.InsertAsync(obj);

                if (obj.PhieuChuyenChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return obj;
            });

        }
        public async Task<KhoPhieuChuyenChiTiet> Update(KhoPhieuChuyenChiTiet obj)
        {
            return await WithConnection(async c =>
            {
                var objCheck = await c.GetAsync(obj);

                if (objCheck == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuChuyenChiTietId.ToString()));
                }

                var result = await c.UpdateAsync(obj);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return obj;
            });
        }
        public async Task<KhoPhieuChuyenChiTiet> UpdatePartial(KhoPhieuChuyenChiTiet obj, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                var objCheck = await c.GetAsync(obj);

                if (objCheck == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", obj.PhieuChuyenChiTietId.ToString()));
                }

                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoPhieuChuyenChiTiet>()
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
                var result = await c.DeleteAsync<KhoPhieuChuyenChiTiet>(new KhoPhieuChuyenChiTiet { PhieuChuyenChiTietId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
