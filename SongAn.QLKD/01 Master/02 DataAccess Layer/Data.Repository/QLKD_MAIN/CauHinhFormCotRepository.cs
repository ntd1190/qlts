using Dapper.FastCrud;
using SongAn.QLKD.Entity.QLKD_MAIN.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Repository.QLKD_MAIN
{
    public class CauHinhFormCotRepository : BaseRepositoryAsync
    {
        public CauHinhFormCotRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<CauHinhFormCot> UpdatePartial(CauHinhFormCot cauHinhFormCot, params string[] field)
        {
            return await WithConnection(async c =>
            {
                CauHinhFormCot obj = await c.GetAsync(cauHinhFormCot);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", cauHinhFormCot.CauHinhFormCotId.ToString()));
                }

                if (obj.CtrVersion != cauHinhFormCot.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , cauHinhFormCot.CauHinhFormCotId.ToString()));
                }

                cauHinhFormCot.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(CauHinhFormCot.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<CauHinhFormCot>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(cauHinhFormCot, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return cauHinhFormCot;
            });
        }

    }
}
