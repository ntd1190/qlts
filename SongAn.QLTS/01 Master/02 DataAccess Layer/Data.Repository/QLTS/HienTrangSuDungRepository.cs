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
    public class HienTrangSuDungRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public HienTrangSuDungRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<HienTrangSuDung> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<HienTrangSuDung>(new HienTrangSuDung { HienTrangSuDungId = id });

                return obj;
            });
        }
        public async Task<HienTrangSuDung> Insert(HienTrangSuDung HienTrangSuDung)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(HienTrangSuDung);

                if (HienTrangSuDung.HienTrangSuDungId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return HienTrangSuDung;
            });

        }
        public async Task<HienTrangSuDung> Update(HienTrangSuDung HienTrangSuDung)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(HienTrangSuDung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", HienTrangSuDung.HienTrangSuDungId.ToString()));
                }

                var result = await c.UpdateAsync(HienTrangSuDung);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return HienTrangSuDung;
            });
        }
        public async Task<HienTrangSuDung> UpdatePartial(HienTrangSuDung HienTrangSuDung, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                HienTrangSuDung obj = await c.GetAsync(HienTrangSuDung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", HienTrangSuDung.HienTrangSuDungId.ToString()));
                }

                var list = field.ToList();

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<HienTrangSuDung>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(HienTrangSuDung, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return HienTrangSuDung;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<HienTrangSuDung>(new HienTrangSuDung { HienTrangSuDungId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
