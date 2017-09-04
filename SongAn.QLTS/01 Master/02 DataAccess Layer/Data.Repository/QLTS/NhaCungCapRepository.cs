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
    public class NhaCungCapRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NhaCungCapRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<NhaCungCap> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NhaCungCap>(new NhaCungCap { NhaCungCapId = id });

                return obj;
            });
        }
        public async Task<NhaCungCap> Insert(NhaCungCap NhaCungCap)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NhaCungCap);

                if (NhaCungCap.NhaCungCapId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NhaCungCap;
            });

        }
        public async Task<NhaCungCap> Update(NhaCungCap NhaCungCap)
        {
            return await WithConnection(async c =>
            {
                NhaCungCap obj = await c.GetAsync(NhaCungCap);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NhaCungCap.NhaCungCapId.ToString()));
                }

                if (obj.CtrVersion != NhaCungCap.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NhaCungCap.NhaCungCapId.ToString()));
                }

                NhaCungCap.CtrVersion += 1;

                var result = await c.UpdateAsync(NhaCungCap);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NhaCungCap;
            });
        }
        public async Task<NhaCungCap> UpdatePartial(NhaCungCap NhaCungCap, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                NhaCungCap obj = await c.GetAsync(NhaCungCap);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NhaCungCap.NhaCungCapId.ToString()));
                }

                if (obj.CtrVersion != NhaCungCap.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NhaCungCap.NhaCungCapId.ToString()));
                }

                NhaCungCap.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NhaCungCap.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NhaCungCap>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(NhaCungCap, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NhaCungCap;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NhaCungCap>(new NhaCungCap { NhaCungCapId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
