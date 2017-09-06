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
    public class DuAnRepository: BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public DuAnRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<DuAn> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<DuAn>(new DuAn { DuAnId = id });

                return obj;
            });
        }
        public async Task<DuAn> Insert(DuAn duan)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(duan);

                if (duan.DuAnId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return duan;
            });

        }
        public async Task<NhanVienDuAn> InsertNV(NhanVienDuAn nvda)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(nvda);

                if (nvda.DuAnId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return nvda;
            });

        }
        public async Task<bool> DeleteNV(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NhanVienDuAn>(new NhanVienDuAn { DuAnId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
        public async Task<NhanVienDuAn> UpdatePartialNV(NhanVienDuAn duan, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                NhanVienDuAn obj = await c.GetAsync(duan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", duan.DuAnId.ToString()));
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NhanVienDuAn>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(duan, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return duan;
            });
            return a;
        }
        public async Task<DuAn> Update(DuAn duan)
        {
            return await WithConnection(async c =>
            {
                DuAn obj = await c.GetAsync(duan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", duan.DuAnId.ToString()));
                }

                if (obj.CtrVersion != duan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , duan.DuAnId.ToString()));
                }

                duan.CtrVersion += 1;

                var result = await c.UpdateAsync(duan);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return duan;
            });
        }
        public async Task<DuAn> UpdatePartial(DuAn duan, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                DuAn obj = await c.GetAsync(duan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", duan.DuAnId.ToString()));
                }

                if (obj.CtrVersion != duan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , duan.DuAnId.ToString()));
                }

                duan.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(duan.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<DuAn>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(duan, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return duan;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<DuAn>(new DuAn { DuAnId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
