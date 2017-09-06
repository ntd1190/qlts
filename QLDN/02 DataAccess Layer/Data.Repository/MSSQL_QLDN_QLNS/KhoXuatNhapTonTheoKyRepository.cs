using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS
{
    public class KhoXuatNhapTonTheoKyRepository : BaseRepositoryAsync
    {
        public KhoXuatNhapTonTheoKyRepository(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<KhoBaoCaoTheoKy> GetById(int id)
        {
            return await WithConnection(async c =>
            {

                var obj = await c.GetAsync<KhoBaoCaoTheoKy>(new KhoBaoCaoTheoKy { KyId = id });

                return obj;
            });
        }

        public async Task<KhoBaoCaoTheoKy> Insert(KhoBaoCaoTheoKy entity)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(entity);

                if (entity.KyId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return entity;
            });

        }

        public async Task<KhoBaoCaoTheoKy> Update(KhoBaoCaoTheoKy entity)
        {
            return await WithConnection(async c =>
            {
                KhoBaoCaoTheoKy obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.KyId.ToString()));
                }

                //if (obj.CtrVersion != entity.CtrVersion)
                //{
                //    throw new Exception(string.Format("Update id {0} have version confict"
                //                                        , entity.BangLuongId.ToString()));
                //}

                //entity.CtrVersion += 1;

                var result = await c.UpdateAsync(entity);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return entity;
            });
        }

        public async Task<KhoBaoCaoTheoKy> UpdatePartial(KhoBaoCaoTheoKy entity, params string[] field)
        {
            return await WithConnection(async c =>
            {
                KhoBaoCaoTheoKy obj = await c.GetAsync(entity);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", entity.KyId.ToString()));
                }

                //if (obj.CtrVersion != entity.CtrVersion)
                //{
                //    throw new Exception(string.Format("Update id {0} have version confict"
                //                                        , entity.BangLuongId.ToString()));
                //}

                //entity.CtrVersion += 1;
                var list = field.ToList();

                //list.Add(nameof(KhoXuatNhapTonTheoKy.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<KhoBaoCaoTheoKy>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(entity, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return entity;
            });
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<KhoBaoCaoTheoKy>(new KhoBaoCaoTheoKy { KyId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
