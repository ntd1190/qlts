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
    public class LoaiTaiSanRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public LoaiTaiSanRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<LoaiTaiSan> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<LoaiTaiSan>(new LoaiTaiSan { LoaiId = id });

                return obj;
            });
        }
        public async Task<LoaiTaiSan> Insert(LoaiTaiSan LoaiTaiSan)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(LoaiTaiSan);

                if (LoaiTaiSan.LoaiId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return LoaiTaiSan;
            });

        }
        public async Task<LoaiTaiSan> Update(LoaiTaiSan LoaiTaiSan)
        {
            return await WithConnection(async c =>
            {
                LoaiTaiSan obj = await c.GetAsync(LoaiTaiSan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LoaiTaiSan.LoaiId.ToString()));
                }

                if (obj.CtrVersion != LoaiTaiSan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , LoaiTaiSan.LoaiId.ToString()));
                }

                LoaiTaiSan.CtrVersion += 1;

                var result = await c.UpdateAsync(LoaiTaiSan);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LoaiTaiSan;
            });
        }
        public async Task<LoaiTaiSan> UpdatePartial(LoaiTaiSan LoaiTaiSan, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                LoaiTaiSan obj = await c.GetAsync(LoaiTaiSan);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", LoaiTaiSan.LoaiId.ToString()));
                }

                if (obj.CtrVersion != LoaiTaiSan.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , LoaiTaiSan.LoaiId.ToString()));
                }

                LoaiTaiSan.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(LoaiTaiSan.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<LoaiTaiSan>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(LoaiTaiSan, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return LoaiTaiSan;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<LoaiTaiSan>(new LoaiTaiSan { LoaiId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
