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
    public class KhoTonKhoRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoTonKhoRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoTonKho> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoTonKho>(new KhoTonKho { KhoTonKhoId = id });

                return obj;
            });
        }
        public async Task<KhoTonKho> Insert(KhoTonKho KhoTonKho)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(KhoTonKho);

                if (KhoTonKho.KhoTonKhoId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KhoTonKho;
            });

        }
        public async Task<KhoTonKho> Update(KhoTonKho KhoTonKho)
        {
            return await WithConnection(async c =>
            {
                KhoTonKho obj = await c.GetAsync(KhoTonKho);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhoTonKho.KhoTonKhoId.ToString()));
                }

                if (obj.CtrVersion != KhoTonKho.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KhoTonKho.KhoTonKhoId.ToString()));
                }

                KhoTonKho.CtrVersion += 1;

                var result = await c.UpdateAsync(KhoTonKho);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhoTonKho;
            });
        }
        public async Task<KhoTonKho> UpdatePartial(KhoTonKho KhoTonKho, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoTonKho obj = await c.GetAsync(KhoTonKho);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhoTonKho.KhoTonKhoId.ToString()));
                }

                if (obj.CtrVersion != KhoTonKho.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KhoTonKho.KhoTonKhoId.ToString()));
                }

                KhoTonKho.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(KhoTonKho.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoTonKho>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KhoTonKho, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhoTonKho;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoTonKho>(new KhoTonKho { KhoTonKhoId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
