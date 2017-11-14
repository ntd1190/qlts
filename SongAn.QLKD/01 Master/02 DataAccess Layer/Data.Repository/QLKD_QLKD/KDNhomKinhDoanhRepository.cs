using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Repository.QLKD
{
    public class NhomKinhDoanhRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NhomKinhDoanhRepository(ContextDto context) : base(context.dbQLKDConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KDNhomKinhDoanh> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KDNhomKinhDoanh>(new KDNhomKinhDoanh { NhomKinhDoanhId = id });

                return obj;
            });
        }
        public async Task<KDNhomKinhDoanh> Insert(KDNhomKinhDoanh NhomKinhDoanh)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NhomKinhDoanh);

                if (NhomKinhDoanh.NhomKinhDoanhId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NhomKinhDoanh;
            });

        }
        public async Task<KDNhomKinhDoanh> Update(KDNhomKinhDoanh KDNhomKinhDoanh)
        {
            return await WithConnection(async c =>
            {
                KDNhomKinhDoanh obj = await c.GetAsync(KDNhomKinhDoanh);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KDNhomKinhDoanh.NhomKinhDoanhId.ToString()));
                }

                if (obj.CtrVersion != KDNhomKinhDoanh.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KDNhomKinhDoanh.NhomKinhDoanhId.ToString()));
                }

                KDNhomKinhDoanh.CtrVersion += 1;

                var result = await c.UpdateAsync(KDNhomKinhDoanh);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KDNhomKinhDoanh;
            });
        }
        public async Task<KDNhomKinhDoanh> UpdatePartial(KDNhomKinhDoanh KDNhomKinhDoanh, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KDNhomKinhDoanh obj = await c.GetAsync(KDNhomKinhDoanh);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KDNhomKinhDoanh.NhomKinhDoanhId.ToString()));
                }

                if (obj.CtrVersion != KDNhomKinhDoanh.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KDNhomKinhDoanh.NhomKinhDoanhId.ToString()));
                }

                KDNhomKinhDoanh.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(KDNhomKinhDoanh.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KDNhomKinhDoanh>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KDNhomKinhDoanh, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KDNhomKinhDoanh;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KDNhomKinhDoanh>(new KDNhomKinhDoanh { NhomKinhDoanhId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
