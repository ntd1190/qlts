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
    public class NuocSanXuatRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NuocSanXuatRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<NuocSanXuat> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NuocSanXuat>(new NuocSanXuat { NuocSanXuatId = id });

                return obj;
            });
        }
        public async Task<NuocSanXuat> Insert(NuocSanXuat NuocSanXuat)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NuocSanXuat);

                if (NuocSanXuat.NuocSanXuatId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NuocSanXuat;
            });

        }
        public async Task<NuocSanXuat> Update(NuocSanXuat NuocSanXuat)
        {
            return await WithConnection(async c =>
            {
                NuocSanXuat obj = await c.GetAsync(NuocSanXuat);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NuocSanXuat.NuocSanXuatId.ToString()));
                }

                if (obj.CtrVersion != NuocSanXuat.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NuocSanXuat.NuocSanXuatId.ToString()));
                }

                NuocSanXuat.CtrVersion += 1;

                var result = await c.UpdateAsync(NuocSanXuat);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NuocSanXuat;
            });
        }
        public async Task<NuocSanXuat> UpdatePartial(NuocSanXuat NuocSanXuat, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                NuocSanXuat obj = await c.GetAsync(NuocSanXuat);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NuocSanXuat.NuocSanXuatId.ToString()));
                }

                if (obj.CtrVersion != NuocSanXuat.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NuocSanXuat.NuocSanXuatId.ToString()));
                }

                NuocSanXuat.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NuocSanXuat.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NuocSanXuat>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(NuocSanXuat, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NuocSanXuat;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NuocSanXuat>(new NuocSanXuat { NuocSanXuatId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
