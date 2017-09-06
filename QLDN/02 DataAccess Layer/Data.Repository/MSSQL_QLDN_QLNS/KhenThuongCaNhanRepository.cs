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
    public class KhenThuongCaNhanRepository : BaseRepositoryAsync
    {
       
            private ContextDto _Context { get; set; }
            public KhenThuongCaNhanRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
                _Context = context;
                OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
            }
            public async Task<KhenThuongCaNhan> GetById(int id)
            {
                return await WithConnection(async c => {

                    var obj = await c.GetAsync<KhenThuongCaNhan>(new KhenThuongCaNhan { KhenThuongCaNhanId = id });

                    return obj;
                });
            }
            public async Task<KhenThuongCaNhan> Insert(KhenThuongCaNhan khenthuong)
            {

                return await WithConnection(async c =>
                {
                    await c.InsertAsync(khenthuong);

                    if (khenthuong.KhenThuongCaNhanId == 0)
                    {
                        throw new Exception("Insert Fail");
                    }

                    return khenthuong;
                });

            }
            public async Task<KhenThuongCaNhan> Update(KhenThuongCaNhan khenthuong)
            {
                return await WithConnection(async c =>
                {
                    KhenThuongCaNhan obj = await c.GetAsync(khenthuong);

                    if (obj == null)
                    {
                        throw new Exception(string.Format("Update id {0} not exist", khenthuong.KhenThuongCaNhanId.ToString()));
                    }

                    if (obj.CtrVersion != khenthuong.CtrVersion)
                    {
                        throw new Exception(string.Format("Update id {0} have version confict"
                                                            , khenthuong.KhenThuongCaNhanId.ToString()));
                    }

                    khenthuong.CtrVersion += 1;

                    var result = await c.UpdateAsync(khenthuong);

                    if (result != true)
                    {
                        throw new Exception("Update Fail");
                    }

                    return khenthuong;
                });
            }
            public async Task<KhenThuongCaNhan> UpdatePartial(KhenThuongCaNhan khenthuong, params string[] field)
            {
                var a = await WithConnection(async c =>
                {
                    KhenThuongCaNhan obj = await c.GetAsync(khenthuong);

                    if (obj == null)
                    {
                        throw new Exception(string.Format("Update id {0} not exist", khenthuong.KhenThuongCaNhanId.ToString()));
                    }

                    if (obj.CtrVersion != khenthuong.CtrVersion)
                    {
                        throw new Exception(string.Format("Update id {0} have version confict"
                                                            , khenthuong.KhenThuongCaNhanId.ToString()));
                    }

                    khenthuong.CtrVersion += 1;
                    var list = field.ToList();

                    list.Add(nameof(khenthuong.CtrVersion));

                    var partialUpdateMapping = OrmConfiguration
                        .GetDefaultEntityMapping<KhenThuongCaNhan>()
                        .Clone()
                        .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                    list.ToArray());

                    var result = await c.UpdateAsync(khenthuong, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                    if (result != true)
                    {
                        throw new Exception("Update Fail");
                    }

                    return khenthuong;
                });
                return a;
            }
            public async Task<bool> Delete(int id)
            {
                return await WithConnection(async c =>
                {
                    var result = await c.DeleteAsync<KhenThuongCaNhan>(new KhenThuongCaNhan { KhenThuongCaNhanId = id });

                    if (result != true)
                    {
                        throw new Exception("Delete Fail");
                    }

                    return result;
                });
            }
    }
}
