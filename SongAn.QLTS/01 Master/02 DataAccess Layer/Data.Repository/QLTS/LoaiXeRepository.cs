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
    public class LoaiXeRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public LoaiXeRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<LoaiXe> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<LoaiXe>(new LoaiXe { LoaiXeId = id });

                return obj;
            });
        }
        public async Task<LoaiXe> Insert(LoaiXe LoaiXe)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(LoaiXe);

                if (LoaiXe.LoaiXeId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return LoaiXe;
            });

        }
        public async Task<LoaiXe> Update(LoaiXe LoaiXe)
        {
            return await WithConnection(async c =>
            {
                var obj = await c.GetAsync(LoaiXe);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LoaiXe.LoaiXeId.ToString()));
                }

                var result = await c.UpdateAsync(LoaiXe);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LoaiXe;
            });
        }
        public async Task<LoaiXe> UpdatePartial(LoaiXe LoaiXe, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                LoaiXe obj = await c.GetAsync(LoaiXe);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LoaiXe.LoaiXeId.ToString()));
                }

                var list = field.ToList();

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<LoaiXe>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(LoaiXe, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LoaiXe;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<LoaiXe>(new LoaiXe { LoaiXeId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
