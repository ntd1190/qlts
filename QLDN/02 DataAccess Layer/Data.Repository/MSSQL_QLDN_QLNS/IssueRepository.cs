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
    public class IssueRepository: BaseRepositoryAsync
    {
        private ContextDto _Context { get; set; }
        public IssueRepository(ContextDto context) : base(context.dbQLNSConnection)
            {
            _Context = context;
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }
        public async Task<Issue> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<Issue>(new Issue { IssueId = id });

                return obj;
            });
        }
        public async Task<Issue> Insert(Issue khenthuong)
        {

            return await WithConnection(async c =>
            {
                await c.InsertAsync(khenthuong);

                if (khenthuong.IssueId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return khenthuong;
            });

        }
        public async Task<Issue> Update(Issue khenthuong)
        {
            return await WithConnection(async c =>
            {
                Issue obj = await c.GetAsync(khenthuong);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khenthuong.IssueId.ToString()));
                }

                if (obj.CtrVersion != khenthuong.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khenthuong.IssueId.ToString()));
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
        public async Task<Issue> UpdatePartial(Issue khenthuong, params string[] field)
        {
            var a = await WithConnection(async c =>
            {
                Issue obj = await c.GetAsync(khenthuong);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", khenthuong.IssueId.ToString()));
                }

                if (obj.CtrVersion != khenthuong.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , khenthuong.IssueId.ToString()));
                }

                khenthuong.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(khenthuong.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<Issue>()
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
                var result = await c.DeleteAsync<Issue>(new Issue { IssueId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
