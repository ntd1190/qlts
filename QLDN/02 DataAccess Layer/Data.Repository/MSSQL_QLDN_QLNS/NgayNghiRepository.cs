using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class NgayNghiRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NgayNghiRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<NgayNghi> GetById(DateTime id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NgayNghi>(new NgayNghi { Ngay = id });

                return obj;
            });
        }
        public async Task<NgayNghi> Insert(NgayNghi ngaynghi)
        {
            

            return await WithConnection(async c =>
            {
                await c.InsertAsync(ngaynghi);

                if (ngaynghi.Ngay.ToString().Length == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return ngaynghi;
            });

        }
        public async Task<NgayNghi> Update(NgayNghi ngaynghi)
        {
            return await WithConnection(async c =>
            {
                NgayNghi obj = await c.GetAsync(ngaynghi);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", ngaynghi.Ngay.ToString()));
                }


                var result = await c.UpdateAsync(ngaynghi);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return ngaynghi;
            });
        }
        public async Task<NgayNghi> UpdatePartial(NgayNghi ngaynghi, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NgayNghi>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(ngaynghi, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return ngaynghi;
            });
            return a;
        }
        public async Task<bool> Delete(DateTime id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NgayNghi>(new NgayNghi { Ngay = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
