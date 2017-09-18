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
    public class NhanVienRepository : BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public NhanVienRepository(ContextDto context) : base(context.dbQLTSConnection)
        {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<NhanVien> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NhanVien>(new NhanVien { NhanVienId = id });

                return obj;
            });
        }
        public async Task<NhanVien> Insert(NhanVien NhanVien)
        {
            
            return await WithConnection(async c =>
            {
                await c.InsertAsync(NhanVien);

                if (NhanVien.NhanVienId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return NhanVien;
            });

        }
        public async Task<NhanVien> Update(NhanVien NhanVien)
        {
            return await WithConnection(async c =>
            {
                NhanVien obj = await c.GetAsync(NhanVien);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NhanVien.NhanVienId.ToString()));
                }

                if (obj.CtrVersion != NhanVien.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NhanVien.NhanVienId.ToString()));
                }

                NhanVien.CtrVersion += 1;

                var result = await c.UpdateAsync(NhanVien);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NhanVien;
            });
        }
        public async Task<NhanVien> UpdatePartial(NhanVien NhanVien, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                NhanVien obj = await c.GetAsync(NhanVien);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", NhanVien.NhanVienId.ToString()));
                }

                if (obj.CtrVersion != NhanVien.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , NhanVien.NhanVienId.ToString()));
                }

                NhanVien.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NhanVien.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NhanVien>()
                    .Clone() 
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(NhanVien, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return NhanVien;
            });
            return a;
        }
        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NhanVien>(new NhanVien { NhanVienId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }




    }
}
