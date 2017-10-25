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
    public class KhoTonKhoChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KhoTonKhoChiTietRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KhoTonKhoChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KhoTonKhoChiTiet>(new KhoTonKhoChiTiet { KhoTonKhoChiTietId = id });

                return obj;
            });
        }
        public async Task<KhoTonKhoChiTiet> Insert(KhoTonKhoChiTiet KhoTonKhoChiTiet)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(KhoTonKhoChiTiet);

                if (KhoTonKhoChiTiet.KhoTonKhoChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KhoTonKhoChiTiet;
            });

        }
        public async Task<KhoTonKhoChiTiet> Update(KhoTonKhoChiTiet KhoTonKhoChiTiet)
        {
            return await WithConnection(async c =>
            {
                KhoTonKhoChiTiet obj = await c.GetAsync(KhoTonKhoChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhoTonKhoChiTiet.KhoTonKhoChiTietId.ToString()));
                }

                var result = await c.UpdateAsync(KhoTonKhoChiTiet);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhoTonKhoChiTiet;
            });
        }
        public async Task<KhoTonKhoChiTiet> UpdatePartial(KhoTonKhoChiTiet KhoTonKhoChiTiet, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KhoTonKhoChiTiet obj = await c.GetAsync(KhoTonKhoChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KhoTonKhoChiTiet.KhoTonKhoChiTietId.ToString()));
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoTonKhoChiTiet>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KhoTonKhoChiTiet, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KhoTonKhoChiTiet;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoTonKhoChiTiet>(new KhoTonKhoChiTiet { KhoTonKhoChiTietId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
