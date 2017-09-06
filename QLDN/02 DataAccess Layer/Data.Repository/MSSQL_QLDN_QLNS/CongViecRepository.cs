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
    public class CongViecRepository: BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public CongViecRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<CongViec> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<CongViec>(new CongViec { CongViecId = id });

                return obj;
            });
        }
        public async Task<CongViec> Insert(CongViec congviec)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(congviec);

                if (congviec.CongViecId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return congviec;
            });

        }
        public async Task<CongViec> Update(CongViec congviec)
        {
            return await WithConnection(async c =>
            {
                CongViec obj = await c.GetAsync(congviec);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", congviec.CongViecId.ToString()));
                }

                if (obj.CtrVersion != congviec.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , congviec.CongViecId.ToString()));
                }

                congviec.CtrVersion += 1;

                var result = await c.UpdateAsync(congviec);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return congviec;
            });
        }
        public async Task<CongViec> UpdatePartial(CongViec congviec, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                CongViec obj = await c.GetAsync(congviec);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", congviec.CongViecId.ToString()));
                }

                if (obj.CtrVersion != congviec.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , congviec.CongViecId.ToString()));
                }

                congviec.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(congviec.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<CongViec>()
                    .Clone()
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(congviec, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return congviec;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<CongViec>(new CongViec { CongViecId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
