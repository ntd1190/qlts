using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.Repository.QLTS
{
    public class KeHoachMuaSamRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KeHoachMuaSamRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KeHoachMuaSam> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KeHoachMuaSam>(new KeHoachMuaSam { MuaSamId = id });

                return obj;
            });
        }
        public async Task<KeHoachMuaSam> Insert(KeHoachMuaSam KeHoachMuaSam)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(KeHoachMuaSam);

                if (KeHoachMuaSam.MuaSamId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KeHoachMuaSam;
            });

        }
        public async Task<KeHoachMuaSam> Update(KeHoachMuaSam KeHoachMuaSam)
        {
            return await WithConnection(async c =>
            {
                KeHoachMuaSam obj = await c.GetAsync(KeHoachMuaSam);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KeHoachMuaSam.MuaSamId.ToString()));
                }

                if (obj.CtrVersion != KeHoachMuaSam.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KeHoachMuaSam.MuaSamId.ToString()));
                }

                KeHoachMuaSam.CtrVersion += 1;

                var result = await c.UpdateAsync(KeHoachMuaSam);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KeHoachMuaSam;
            });
        }
        public async Task<KeHoachMuaSam> UpdatePartial(KeHoachMuaSam KeHoachMuaSam, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KeHoachMuaSam obj = await c.GetAsync(KeHoachMuaSam);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KeHoachMuaSam.MuaSamId.ToString()));
                }

                if (obj.CtrVersion != KeHoachMuaSam.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KeHoachMuaSam.MuaSamId.ToString()));
                }

                KeHoachMuaSam.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(KeHoachMuaSam.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KeHoachMuaSam>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KeHoachMuaSam, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KeHoachMuaSam;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KeHoachMuaSam>(new KeHoachMuaSam { MuaSamId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

    }
}
