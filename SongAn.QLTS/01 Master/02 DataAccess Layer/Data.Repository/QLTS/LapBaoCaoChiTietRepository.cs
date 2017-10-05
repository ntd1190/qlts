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
    public class LapBaoCaoChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public LapBaoCaoChiTietRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<LapBaoCaoChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<LapBaoCaoChiTiet>(new LapBaoCaoChiTiet { LapBaoCaoChiTietId = id });

                return obj;
            });
        }
        public async Task<LapBaoCaoChiTiet> Insert(LapBaoCaoChiTiet LapBaoCaoChiTiet)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(LapBaoCaoChiTiet);

                if (LapBaoCaoChiTiet.LapBaoCaoChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return LapBaoCaoChiTiet;
            });

        }
        public async Task<LapBaoCaoChiTiet> Update(LapBaoCaoChiTiet LapBaoCaoChiTiet)
        {
            return await WithConnection(async c =>
            {
                LapBaoCaoChiTiet obj = await c.GetAsync(LapBaoCaoChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LapBaoCaoChiTiet.LapBaoCaoChiTietId.ToString()));
                }


                var result = await c.UpdateAsync(LapBaoCaoChiTiet);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LapBaoCaoChiTiet;
            });
        }
        public async Task<LapBaoCaoChiTiet> UpdatePartial(LapBaoCaoChiTiet LapBaoCaoChiTiet, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                LapBaoCaoChiTiet obj = await c.GetAsync(LapBaoCaoChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LapBaoCaoChiTiet.LapBaoCaoChiTietId.ToString()));
                }

                var list = field.ToList();

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<LapBaoCaoChiTiet>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(LapBaoCaoChiTiet, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LapBaoCaoChiTiet;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<LapBaoCaoChiTiet>(new LapBaoCaoChiTiet { LapBaoCaoChiTietId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

    }
}
