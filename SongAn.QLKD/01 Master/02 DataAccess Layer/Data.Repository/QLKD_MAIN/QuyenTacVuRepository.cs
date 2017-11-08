using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Entity.QLKD_MAIN.Entity;
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Repository.QLKD_MAIN
{
    public class QuyenTacVuRepository : Util.Common.Repository.BaseRepositoryAsync
    {
        public QuyenTacVuRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<QuyenTacVu> UpdatePartial(QuyenTacVu quyen, params string[] field)
        {
            return await WithConnection(async c =>
            {
                QuyenTacVu obj = await c.GetAsync(quyen);

                if (obj == null)
                {
                        await c.InsertAsync(quyen);
                        if (quyen.ChucNangId == 0)
                        {
                            throw new Exception("Insert Fail");
                        }
                        return quyen;
                }
                var list = field.ToList();
                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<QuyenTacVu>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(quyen, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return quyen;
            });
        }

    }
}
