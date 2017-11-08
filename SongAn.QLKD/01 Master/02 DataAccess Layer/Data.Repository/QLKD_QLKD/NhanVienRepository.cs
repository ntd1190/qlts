
using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Repository.MSSQL_QLKD
{
    public class NhanVienRepository : BaseRepositoryAsync
    {
        public NhanVienRepository(ContextDto context) : base(context.dbQLKDConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<NhanVien> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<NhanVien>(new NhanVien { NhanVienId = id });

                return obj;
            });
        }

        public async Task<NhanVien> Insert(NhanVien nhanvien)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(nhanvien);

                if (nhanvien.NhanVienId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return nhanvien;
            });

        }

        public async Task<NhanVien> Update(NhanVien nhanvien)
        {
            return await WithConnection(async c =>
            {
                NhanVien obj = await c.GetAsync(nhanvien);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nhanvien.NhanVienId.ToString()));
                }

                if (obj.CtrVersion != nhanvien.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , nhanvien.NhanVienId.ToString()));
                }

                nhanvien.CtrVersion += 1;

                var result = await c.UpdateAsync(nhanvien);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nhanvien;
            });
        }


        public async Task<NhanVien> UpdatePartialBase(NhanVien nhanvien, bool checkCtrVersion, params string[] field)
        {
            return await WithConnection(async c =>
            {
                NhanVien obj = await c.GetAsync(nhanvien);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nhanvien.NhanVienId.ToString()));
                }

                if (checkCtrVersion == true && obj.CtrVersion != nhanvien.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , nhanvien.NhanVienId.ToString()));
                }

                nhanvien.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NhanVien.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NhanVien>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(nhanvien, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nhanvien;
            });
        }
        public async Task<NhanVien> UpdatePartial(NhanVien nhanvien, params string[] field)
        {
            return await UpdatePartialBase(nhanvien, true, field);
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NhanVien>(new NhanVien { NhanVienId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
