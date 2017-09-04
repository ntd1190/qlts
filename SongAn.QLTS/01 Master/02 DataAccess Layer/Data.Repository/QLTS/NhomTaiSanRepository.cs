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
    public class NhomTaiSanRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NhomTaiSanRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<NhomTaiSan> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NhomTaiSan>(new NhomTaiSan { NhomId = id });

                return obj;
            });
        }
        public async Task<NhomTaiSan> Insert(NhomTaiSan NhomTaiSan)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NhomTaiSan);

                if (NhomTaiSan.NhomId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NhomTaiSan;
            });

        }
        public async Task<NhomTaiSan> Update(NhomTaiSan NhomTaiSan)
        {
            return await WithConnection(async c =>
            {
                NhomTaiSan obj = await c.GetAsync(NhomTaiSan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NhomTaiSan.NhomId.ToString()));
                }

                if (obj.CtrVersion != NhomTaiSan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NhomTaiSan.NhomId.ToString()));
                }

                NhomTaiSan.CtrVersion += 1;

                var result = await c.UpdateAsync(NhomTaiSan);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NhomTaiSan;
            });
        }
        public async Task<NhomTaiSan> UpdatePartial(NhomTaiSan NhomTaiSan, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                NhomTaiSan obj = await c.GetAsync(NhomTaiSan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NhomTaiSan.NhomId.ToString()));
                }

                if (obj.CtrVersion != NhomTaiSan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NhomTaiSan.NhomId.ToString()));
                }

                NhomTaiSan.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NhomTaiSan.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NhomTaiSan>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(NhomTaiSan, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NhomTaiSan;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NhomTaiSan>(new NhomTaiSan { NhomId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
