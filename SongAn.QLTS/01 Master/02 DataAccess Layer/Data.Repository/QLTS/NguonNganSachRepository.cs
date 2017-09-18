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
    public class NguonNganSachRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NguonNganSachRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<NguonNganSach> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NguonNganSach>(new NguonNganSach { NguonNganSachId = id });

                return obj;
            });
        }
        public async Task<NguonNganSach> Insert(NguonNganSach NguonNganSach)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NguonNganSach);

                if (NguonNganSach.NguonNganSachId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NguonNganSach;
            });

        }
        public async Task<NguonNganSach> Update(NguonNganSach NguonNganSach)
        {
            return await WithConnection(async c =>
            {
                NguonNganSach obj = await c.GetAsync(NguonNganSach);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NguonNganSach.NguonNganSachId.ToString()));
                }

                if (obj.CtrVersion != NguonNganSach.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NguonNganSach.NguonNganSachId.ToString()));
                }

                NguonNganSach.CtrVersion += 1;

                var result = await c.UpdateAsync(NguonNganSach);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NguonNganSach;
            });
        }
        public async Task<NguonNganSach> UpdatePartial(NguonNganSach NguonNganSach, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                NguonNganSach obj = await c.GetAsync(NguonNganSach);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NguonNganSach.NguonNganSachId.ToString()));
                }

                if (obj.CtrVersion != NguonNganSach.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NguonNganSach.NguonNganSachId.ToString()));
                }

                NguonNganSach.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NguonNganSach.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NguonNganSach>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(NguonNganSach, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NguonNganSach;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NguonNganSach>(new NguonNganSach { NguonNganSachId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
