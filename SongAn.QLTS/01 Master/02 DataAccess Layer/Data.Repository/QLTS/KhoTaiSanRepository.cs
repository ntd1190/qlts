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
    public class KhoTaiSanRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoTaiSanRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoTaiSan> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoTaiSan>(new KhoTaiSan { KhoTaiSanId = id });

                return obj;
            });
        }
        public async Task<KhoTaiSan> Insert(KhoTaiSan KhoTaiSan)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(KhoTaiSan);

                if (KhoTaiSan.KhoTaiSanId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KhoTaiSan;
            });

        }
        public async Task<KhoTaiSan> Update(KhoTaiSan KhoTaiSan)
        {
            return await WithConnection(async c =>
            {
                KhoTaiSan obj = await c.GetAsync(KhoTaiSan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhoTaiSan.KhoTaiSanId.ToString()));
                }

                if (obj.CtrVersion != KhoTaiSan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KhoTaiSan.KhoTaiSanId.ToString()));
                }

                KhoTaiSan.CtrVersion += 1;

                var result = await c.UpdateAsync(KhoTaiSan);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhoTaiSan;
            });
        }
        public async Task<KhoTaiSan> UpdatePartial(KhoTaiSan KhoTaiSan, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoTaiSan obj = await c.GetAsync(KhoTaiSan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhoTaiSan.KhoTaiSanId.ToString()));
                }

                if (obj.CtrVersion != KhoTaiSan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KhoTaiSan.KhoTaiSanId.ToString()));
                }

                KhoTaiSan.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(KhoTaiSan.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoTaiSan>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KhoTaiSan, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhoTaiSan;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoTaiSan>(new KhoTaiSan { KhoTaiSanId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
