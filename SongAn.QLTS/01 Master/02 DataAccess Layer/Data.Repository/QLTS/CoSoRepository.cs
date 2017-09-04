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
    public class CoSoRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public CoSoRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<CoSo> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<CoSo>(new CoSo { CoSoId = id });

                return obj;
            });
        }
        public async Task<CoSo> Insert(CoSo CoSo)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(CoSo);

                if (CoSo.CoSoId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return CoSo;
            });

        }
        public async Task<CoSo> Update(CoSo CoSo)
        {
            return await WithConnection(async c =>
            {
                CoSo obj = await c.GetAsync(CoSo);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", CoSo.CoSoId.ToString()));
                }

                if (obj.CtrVersion != CoSo.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , CoSo.CoSoId.ToString()));
                }

                CoSo.CtrVersion += 1;

                var result = await c.UpdateAsync(CoSo);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return CoSo;
            });
        }
        public async Task<CoSo> UpdatePartial(CoSo CoSo, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                CoSo obj = await c.GetAsync(CoSo);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", CoSo.CoSoId.ToString()));
                }

                if (obj.CtrVersion != CoSo.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , CoSo.CoSoId.ToString()));
                }

                CoSo.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(CoSo.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<CoSo>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(CoSo, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return CoSo;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<CoSo>(new CoSo { CoSoId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
