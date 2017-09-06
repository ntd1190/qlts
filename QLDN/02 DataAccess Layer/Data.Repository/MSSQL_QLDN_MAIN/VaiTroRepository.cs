using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN
{
    public class VaiTroRepository : BaseRepositoryAsync
    {
        public VaiTroRepository(string connectionString) : base(connectionString)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<VaiTro> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<VaiTro>(new VaiTro { VaiTroId = id });

                return obj;
            });
        }

        public async Task<VaiTro> Insert(VaiTro vaitro)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(vaitro);

                if (vaitro.VaiTroId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return vaitro;
            });

        }

        public async Task<VaiTro> Update(VaiTro vaitro)
        {
            return await WithConnection(async c =>
            {
                VaiTro obj = await c.GetAsync(vaitro);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", vaitro.VaiTroId.ToString()));
                }

                if (obj.CtrVersion != vaitro.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , vaitro.VaiTroId.ToString()));
                }

                vaitro.CtrVersion += 1;

                var result = await c.UpdateAsync(vaitro);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return vaitro;
            });
        }

        public async Task<VaiTro> UpdatePartial(VaiTro vaitro, params string[] field)
        {
            return await WithConnection(async c =>
            {
                VaiTro obj = await c.GetAsync(vaitro);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", vaitro.VaiTroId.ToString()));
                }

                if (obj.CtrVersion != vaitro.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , vaitro.VaiTroId.ToString()));
                }

                vaitro.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(VaiTro.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<VaiTro>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(vaitro, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return vaitro;
            });
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<VaiTro>(new VaiTro { VaiTroId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

        public async Task<VaiTro> SelectOne(int id)
        {
            return await WithConnection(async c =>
            {
                // Here's all the same data access code,
                // albeit now it's async, and nicely wrapped
                // in this handy WithConnection() call.
                var p = new DynamicParameters();
                p.Add("VaiTroId", id, DbType.Int32);

                var objResult = await c.QueryAsync<VaiTro>(
                    sql: "sp_VaiTro_SelectOne",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<VaiTro>> SelectAll()
        {
            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<VaiTro>(
                    sql: "sp_VaiTro_SelectAll",
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        public async Task<int> SelectAllCount()
        {
            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<int>(
                    sql: "sp_VaiTro_SelectAllCount",
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<VaiTro>> SelectAllByCriteria(string WhereClause, string OrderClause, int? Skip = null, int? Take = null)
        {

            string _whereClause = WhereClause;

            string _orderClause = OrderClause.Equals("") ? nameof(VaiTro.VaiTroId) : OrderClause;

            string _skipClause = Skip != null ? string.Format("OFFSET {0} ROWS", Skip) : "";

            string _takeClause = Take != null ? string.Format("FETCH NEXT {0} ROWS ONLY", Take) : "";

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("WhereClause", _whereClause, DbType.String);
                p.Add("OrderClause", _orderClause, DbType.String);
                p.Add("SkipClause", _skipClause, DbType.String);
                p.Add("TakeClause", _takeClause, DbType.String);

                var objResult = await c.QueryAsync<VaiTro>(
                    sql: "sp_VaiTro_SelectAllByCriteria",
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
                    sql: "sp_VaiTro_SelectAllByCriteriaCount",
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

            string _fieldsField = FieldsField.Equals("") ? nameof(VaiTro.VaiTroId) : FieldsField;

            string _whereClause = WhereClause;

            string _orderClause = OrderClause.Equals("") ? nameof(VaiTro.VaiTroId) : OrderClause;

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
                    sql: "sp_VaiTro_SelectAllByCriteriaProjection",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }
    }
}
