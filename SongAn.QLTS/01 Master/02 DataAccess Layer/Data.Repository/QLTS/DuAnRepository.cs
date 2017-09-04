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
    public class DuAnRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public DuAnRepository(ContextDto context) : base(context.dbQLTSConnection)
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
        public async Task<DuAn> Insert(DuAn DuAn)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(DuAn);

                if (DuAn.DuAnId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return DuAn;
            });

        }
        public async Task<DuAn> Update(DuAn DuAn)
        {
            return await WithConnection(async c =>
            {
                DuAn obj = await c.GetAsync(DuAn);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", DuAn.DuAnId.ToString()));
                }

                if (obj.CtrVersion != DuAn.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , DuAn.DuAnId.ToString()));
                }

                DuAn.CtrVersion += 1;

                var result = await c.UpdateAsync(DuAn);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return DuAn;
            });
        }
        public async Task<DuAn> UpdatePartial(DuAn DuAn, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                DuAn obj = await c.GetAsync(DuAn);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", DuAn.DuAnId.ToString()));
                }

                if (obj.CtrVersion != DuAn.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , DuAn.DuAnId.ToString()));
                }

                DuAn.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(DuAn.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<DuAn>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(DuAn, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return DuAn;
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
