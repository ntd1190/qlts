using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;


namespace SongAn.QLDN.Data.QLNS.PheDuyet
{
    public class UpdatePheDuyetByProjectionDac : BaseRepositoryAsync
    {
        #region public properties
        public string FieldsField { get; set; }

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string SearchString { get; set; }

        /// <summary>
        /// Danh sách issue khách hàng
        /// </summary>
        ///  
        public string Table { get; set; }
        public string Field { get; set; }
        public string where { get; set; }


        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdatePheDuyetByProjectionDac(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {

        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {

        }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("FIELD", Field, DbType.String);
                p.Add("TABLE", Table, DbType.String);
                p.Add("WHERE", where, DbType.String);
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_Update_Tables",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
