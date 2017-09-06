using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN
{
    public class ChucNangRepository : BaseRepositoryAsync
    {
        public ChucNangRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<ChucNang> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<ChucNang>(new ChucNang { ChucNangId = id });

                return obj;
            });
        }

        public async Task<ChucNang> Insert(ChucNang chucnang)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(chucnang);

                if (chucnang.ChucNangId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return chucnang;
            });

        }

        public async Task<ChucNang> Update(ChucNang chucnang)
        {
            return await WithConnection(async c =>
            {
                ChucNang obj = await c.GetAsync(chucnang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", chucnang.ChucNangId.ToString()));
                }

                if (obj.CtrVersion != chucnang.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , chucnang.ChucNangId.ToString()));
                }

                chucnang.CtrVersion += 1;

                var result = await c.UpdateAsync(chucnang);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return chucnang;
            });
        }

        public async Task<ChucNang> UpdatePartial(ChucNang chucnang, params string[] field)
        {
            return await WithConnection(async c =>
            {
                ChucNang obj = await c.GetAsync(chucnang);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", chucnang.ChucNangId.ToString()));
                }

                if (obj.CtrVersion != chucnang.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , chucnang.ChucNangId.ToString()));
                }

                chucnang.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(ChucNang.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<ChucNang>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(chucnang, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return chucnang;
            });
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<ChucNang>(new ChucNang { ChucNangId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

        public async Task<ChucNang> SelectOne(int id)
        {
            return await WithConnection(async c =>
            {
                // Here's all the same data access code,
                // albeit now it's async, and nicely wrapped
                // in this handy WithConnection() call.
                var p = new DynamicParameters();
                p.Add("ChucNangId", id, DbType.Int32);

                var objResult = await c.QueryAsync<ChucNang>(
                    sql: "sp_ChucNang_SelectOne",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<ChucNang>> SelectAll()
        {
            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<ChucNang>(
                    sql: "sp_ChucNang_SelectAll",
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        public async Task<int> SelectAllCount()
        {
            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<int>(
                    sql: "sp_ChucNang_SelectAllCount",
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<ChucNang>> SelectAllByCriteria(string WhereClause, string OrderClause, int? Skip = null, int? Take = null)
        {

            string _whereClause = WhereClause;

            string _orderClause = OrderClause.Equals("") ? nameof(ChucNang.ChucNangId) : OrderClause;

            string _skipClause = Skip != null ? string.Format("OFFSET {0} ROWS", Skip) : "";

            string _takeClause = Take != null ? string.Format("FETCH NEXT {0} ROWS ONLY", Take) : "";

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("WhereClause", _whereClause, DbType.String);
                p.Add("OrderClause", _orderClause, DbType.String);
                p.Add("SkipClause", _skipClause, DbType.String);
                p.Add("TakeClause", _takeClause, DbType.String);

                var objResult = await c.QueryAsync<ChucNang>(
                    sql: "sp_ChucNang_SelectAllByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        public async Task<int> SelectAllByCriteriaCount(string WhereClause)
        {
            string _whereClause = WhereClause;

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("WhereClause", _whereClause, DbType.String);

                var objResult = await c.QueryAsync<int>(
                    sql: "sp_ChucNang_SelectAllByCriteriaCount",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<dynamic>> SelectAllByCriteriaProjection(
            string FieldsField
            , string WhereClause
            , string OrderClause
            , int? Skip = null
            , int? Take = null)
        {

            string _fieldsField = FieldsField.Equals("") ? nameof(ChucNang.ChucNangId) : FieldsField;

            string _whereClause = WhereClause.Equals("") ? "" : WhereClause;

            string _orderClause = OrderClause.Equals("") ? nameof(ChucNang.ChucNangId) : OrderClause;

            string _skipClause = Skip != null ? string.Format("OFFSET {0} ROWS", Skip) : "";

            string _takeClause = Take != null ? string.Format("FETCH NEXT {0} ROWS ONLY", Take) : "";

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("FieldsField", _fieldsField, DbType.String);
                p.Add("WhereClause", _whereClause, DbType.String);
                p.Add("OrderClause", _orderClause, DbType.String);
                p.Add("SkipClause", _skipClause, DbType.String);
                p.Add("TakeClause", _takeClause, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_ChucNang_SelectAllByCriteriaProjection",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }
    }
}
