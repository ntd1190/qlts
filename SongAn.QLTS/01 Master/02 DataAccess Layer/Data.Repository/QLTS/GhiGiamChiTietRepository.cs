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
    public class GhiGiamChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public GhiGiamChiTietRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<GhiGiamChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<GhiGiamChiTiet>(new GhiGiamChiTiet { GhiGiamId = id });

                return obj;
            });
        }
        public async Task<GhiGiamChiTiet> Insert(GhiGiamChiTiet GhiGiamChiTiet)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(GhiGiamChiTiet);

                if (GhiGiamChiTiet.GhiGiamId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return GhiGiamChiTiet;
            });

        }
        public async Task<GhiGiamChiTiet> Update(GhiGiamChiTiet GhiGiamChiTiet)
        {
            return await WithConnection(async c =>
            {
                GhiGiamChiTiet obj = await c.GetAsync(GhiGiamChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", GhiGiamChiTiet.GhiGiamId.ToString()));
                }

                var result = await c.UpdateAsync(GhiGiamChiTiet);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return GhiGiamChiTiet;
            });
        }
        public async Task<GhiGiamChiTiet> UpdatePartial(GhiGiamChiTiet GhiGiamChiTiet, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                GhiGiamChiTiet obj = await c.GetAsync(GhiGiamChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", GhiGiamChiTiet.GhiGiamId.ToString()));
                }

               
                var list = field.ToList();

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<GhiGiamChiTiet>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(GhiGiamChiTiet, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return GhiGiamChiTiet;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<GhiGiamChiTiet>(new GhiGiamChiTiet { GhiGiamId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

    }
}
