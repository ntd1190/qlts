/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : Repository
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
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
    public class NguoiDungAsyncRepository : Util.Common.Repository.BaseRepositoryAsync
    {
        public NguoiDungAsyncRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public NguoiDungAsyncRepository(string ConnectionString) : base(ConnectionString)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public async Task<NguoiDung> GetById(int id)
        {
            return await WithConnection(async c => {

                var obj = await c.GetAsync<NguoiDung>(new NguoiDung { NguoiDungId = id });

                return obj;
            });
        }

        public async Task<NguoiDung> Insert(NguoiDung nguoidung)
        {
            return await WithConnection(async c =>
            {
                await c.InsertAsync(nguoidung);

                if(nguoidung.NguoiDungId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return nguoidung;
            });

        }

        public async Task<NguoiDung> Update(NguoiDung nguoidung)
        {
            return await WithConnection(async c =>
            {
                NguoiDung obj = await c.GetAsync(nguoidung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nguoidung.NguoiDungId.ToString()));
                }

                if (obj.CtrVersion != nguoidung.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , nguoidung.NguoiDungId.ToString()));
                }

                nguoidung.CtrVersion += 1;

                var result = await c.UpdateAsync(nguoidung);

                if(result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nguoidung;
            });
        }

        public async Task<NguoiDung> UpdatePartial(NguoiDung nguoidung, params string[] field)
        {
            return await WithConnection(async c =>
            {
                NguoiDung obj = await c.GetAsync(nguoidung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nguoidung.NguoiDungId.ToString()));
                }

                if (obj.CtrVersion != nguoidung.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , nguoidung.NguoiDungId.ToString()));
                }

                nguoidung.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NguoiDung.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NguoiDung>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = await c.UpdateAsync(nguoidung, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nguoidung;
            });
        }

        public async Task<bool> Delete(int id)
        {
            return await WithConnection(async c =>
            {
                var result = await c.DeleteAsync<NguoiDung>(new NguoiDung { NguoiDungId = id});

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

        /* Vi Du call store procedure
        In the simple case you can do:

        var user = cnn.Query<User>("spGetUser", new { Id = 1 },
                commandType: CommandType.StoredProcedure).First();

                If you want something more fancy, you can do:

         var p = new DynamicParameters();
                p.Add("@a", 11);
         p.Add("@b", dbType: DbType.Int32, direction: ParameterDirection.Output);
         p.Add("@c", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

         cnn.Execute("spMagicProc", p, commandType: CommandType.StoredProcedure); 

         int b = p.Get<int>("@b");
         int c = p.Get<int>("@c");
         */

        public async Task<NguoiDung> SelectOne(int id)
        {
            return await WithConnection(async c =>
            {
                // Here's all the same data access code,
                // albeit now it's async, and nicely wrapped
                // in this handy WithConnection() call.
                var p = new DynamicParameters();
                p.Add("NguoiDungId", id, DbType.Int32);

                var objResult = await c.QueryAsync<NguoiDung>(
                    sql: "sp_NguoiDung_SelectOne",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<NguoiDung>> SelectAll()
        {
            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<NguoiDung>(
                    sql: "sp_NguoiDung_SelectAll",
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        public async Task<int> SelectAllCount()
        {
            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<int>(
                    sql: "sp_NguoiDung_SelectAllCount",
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        public async Task<IEnumerable<NguoiDung>> SelectAllByCriteria(string WhereClause,string OrderClause,int? Skip = null, int? Take = null)
        {

            string _whereClause = WhereClause;

            string _orderClause = OrderClause.Equals("") ? nameof(NguoiDung.NguoiDungId) : OrderClause;

            string _skipClause = Skip != null? string.Format("OFFSET {0} ROWS", Skip) : "";

            string _takeClause = Take != null ? string.Format("FETCH NEXT {0} ROWS ONLY", Take): "";
                
            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("WhereClause", _whereClause, DbType.String);
                p.Add("OrderClause", _orderClause, DbType.String);
                p.Add("SkipClause", _skipClause, DbType.String);
                p.Add("TakeClause", _takeClause, DbType.String);

                var objResult = await c.QueryAsync<NguoiDung>(
                    sql: "sp_NguoiDung_SelectAllByCriteria",
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
                    sql: "sp_NguoiDung_SelectAllByCriteriaCount",
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

            string _fieldsField = FieldsField.Equals("") ? nameof(NguoiDung.NguoiDungId) : FieldsField;

            string _whereClause = WhereClause;

            string _orderClause = OrderClause.Equals("") ? nameof(NguoiDung.NguoiDungId) : OrderClause;

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
                    sql: "sp_NguoiDung_SelectAllByCriteriaProjection",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }


    }
}
