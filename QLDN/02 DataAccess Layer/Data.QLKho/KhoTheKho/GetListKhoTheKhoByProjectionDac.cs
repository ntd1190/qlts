using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoTheKho
{
    public class GetListKhoTheKhoByProjectionDac : BaseRepositoryAsync
    {
        #region public properties
        
        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string KhoHangId { get; set; }
        public string HangHoaId { get; set; }
        public string LoginId { get; set; }
        /// <summary>
        /// Danh sách hang hoa
        /// </summary>
        ///  
        /// <summary>
        /// Mệnh đề order by
        /// </summary>
        public string OrderClause { get; set; }

        /// <summary>
        /// Số dòng skip (để phân trang)
        /// </summary>

        /// <summary>
        /// Số dòng take (để phân trang)
        /// </summary>

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListKhoTheKhoByProjectionDac(ContextDto context) : base(context.dbQLNSConnection)
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
                p.Add("SEARCH_TUNGAY", TuNgay, DbType.String);
                p.Add("SEARCH_DENNGAY", DenNgay, DbType.String);
                p.Add("SEARCH_KHOHANGID", KhoHangId, DbType.String);
                p.Add("SEARCH_HANGHOAID", HangHoaId, DbType.String);
                p.Add("LOGIN_ID", LoginId, DbType.String);
                p.Add("ORDER_CLAUSE", OrderClause, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoTheKho_GetListKhoTheKhoByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
