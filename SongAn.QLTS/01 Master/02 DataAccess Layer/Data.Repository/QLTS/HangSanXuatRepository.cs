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
    public class HangSanXuatRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public HangSanXuatRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<HangSanXuat> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<HangSanXuat>(new HangSanXuat { HangSanXuatId = id });

                return obj;
            });
        }
        public async Task<HangSanXuat> Insert(HangSanXuat HangSanXuat)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(HangSanXuat);

                if (HangSanXuat.HangSanXuatId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return HangSanXuat;
            });

        }
        public async Task<HangSanXuat> Update(HangSanXuat HangSanXuat)
        {
            return await WithConnection(async c =>
            {
                HangSanXuat obj = await c.GetAsync(HangSanXuat);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", HangSanXuat.HangSanXuatId.ToString()));
                }

                if (obj.CtrVersion != HangSanXuat.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , HangSanXuat.HangSanXuatId.ToString()));
                }

                HangSanXuat.CtrVersion += 1;

                var result = await c.UpdateAsync(HangSanXuat);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return HangSanXuat;
            });
        }
        public async Task<HangSanXuat> UpdatePartial(HangSanXuat HangSanXuat, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                HangSanXuat obj = await c.GetAsync(HangSanXuat);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", HangSanXuat.HangSanXuatId.ToString()));
                }

                if (obj.CtrVersion != HangSanXuat.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , HangSanXuat.HangSanXuatId.ToString()));
                }

                HangSanXuat.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(HangSanXuat.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<HangSanXuat>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(HangSanXuat, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return HangSanXuat;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<HangSanXuat>(new HangSanXuat { HangSanXuatId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
