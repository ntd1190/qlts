using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using SongAn.QLTS.Util.Common.Repository;

namespace SongAn.QLTS.Data.Main.VaiTro
{
    public class GetListVaiTroByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public string VAITROIDS { get; set; }
        public string MAVAITRO { get; set; }
        public string COSOIDS { get; set; }
        public string SEARCH { get; set; }
        public string ORDERCLAUSE { get; set; }
        public int NHANVIEN_ID { get; set; }
        public int COSO_ID { get; set; }
        public int USER_ID { get; set; }
        public int SKIP { get; set; }
        public int TAKE { get; set; }

        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListVaiTroByCriteriaDac(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }

        #endregion
        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init() { }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate() { }

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
                var p = new DynamicParameters(this);
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_VaiTro_GetListVaiTroByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
