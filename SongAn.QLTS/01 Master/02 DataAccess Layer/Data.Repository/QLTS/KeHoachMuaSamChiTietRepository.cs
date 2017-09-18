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
    public class KeHoachMuaSamChiTietRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public KeHoachMuaSamChiTietRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<KeHoachMuaSamChiTiet> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<KeHoachMuaSamChiTiet>(new KeHoachMuaSamChiTiet { MuaSamChiTietId = id });

                return obj;
            });
        }
        public async Task<KeHoachMuaSamChiTiet> Insert(KeHoachMuaSamChiTiet KeHoachMuaSamChiTiet)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(KeHoachMuaSamChiTiet);

                if (KeHoachMuaSamChiTiet.MuaSamChiTietId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return KeHoachMuaSamChiTiet;
            });

        }
        public async Task<KeHoachMuaSamChiTiet> Update(KeHoachMuaSamChiTiet KeHoachMuaSamChiTiet)
        {
            return await WithConnection(async c =>
            {
                KeHoachMuaSamChiTiet obj = await c.GetAsync(KeHoachMuaSamChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KeHoachMuaSamChiTiet.MuaSamChiTietId.ToString()));
                }


                var result = await c.UpdateAsync(KeHoachMuaSamChiTiet);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KeHoachMuaSamChiTiet;
            });
        }
        public async Task<KeHoachMuaSamChiTiet> UpdatePartial(KeHoachMuaSamChiTiet KeHoachMuaSamChiTiet, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                KeHoachMuaSamChiTiet obj = await c.GetAsync(KeHoachMuaSamChiTiet);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", KeHoachMuaSamChiTiet.MuaSamChiTietId.ToString()));
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KeHoachMuaSamChiTiet>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(KeHoachMuaSamChiTiet, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return KeHoachMuaSamChiTiet;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KeHoachMuaSamChiTiet>(new KeHoachMuaSamChiTiet { MuaSamChiTietId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
