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
    public class KhachHangRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhachHangRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhachHang> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhachHang>(new KhachHang { KhachHangId = id });

                return obj;
            });
        }
        public async Task<KhachHang> Insert(KhachHang KhachHang)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(KhachHang);

                if (KhachHang.KhachHangId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KhachHang;
            });

        }
        public async Task<KhachHang> Update(KhachHang KhachHang)
        {
            return await WithConnection(async c =>
            {
                KhachHang obj = await c.GetAsync(KhachHang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhachHang.KhachHangId.ToString()));
                }

                if (obj.CtrVersion != KhachHang.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KhachHang.KhachHangId.ToString()));
                }

                KhachHang.CtrVersion += 1;

                var result = await c.UpdateAsync(KhachHang);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhachHang;
            });
        }
        public async Task<KhachHang> UpdatePartial(KhachHang KhachHang, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhachHang obj = await c.GetAsync(KhachHang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhachHang.KhachHangId.ToString()));
                }

                if (obj.CtrVersion != KhachHang.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , KhachHang.KhachHangId.ToString()));
                }

                KhachHang.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(KhachHang.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhachHang>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KhachHang, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhachHang;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhachHang>(new KhachHang { KhachHangId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
