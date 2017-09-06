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
    public class PhongBanRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public PhongBanRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<PhongBan> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<PhongBan>(new PhongBan { PhongBanId = id });

                return obj;
            });
        }
        public async Task<PhongBan> Insert(PhongBan phongban)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(phongban);

                if (phongban.PhongBanId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return phongban;
            });

        }
        public async Task<PhongBan> Update(PhongBan phongban)
        {
            return await WithConnection(async c =>
            {
                PhongBan obj = await c.GetAsync(phongban);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", phongban.PhongBanId.ToString()));
                }

                if (obj.CtrVersion != phongban.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , phongban.PhongBanId.ToString()));
                }

                phongban.CtrVersion += 1;

                var result = await c.UpdateAsync(phongban);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return phongban;
            });
        }
        public async Task<PhongBan> UpdatePartial(PhongBan phongban, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                PhongBan obj = await c.GetAsync(phongban);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", phongban.PhongBanId.ToString()));
                }

                if (obj.CtrVersion != phongban.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , phongban.PhongBanId.ToString()));
                }

                phongban.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(phongban.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<PhongBan>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(phongban, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return phongban;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<PhongBan>(new PhongBan { PhongBanId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
