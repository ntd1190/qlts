/*****************************************************************************
1. Create Date  : 2017.09.12
2. Creator      : HOI
3. Function     : QLDNKHO/KHOSODUTONKHO/REPORT
4. Description  : 
5. History      : 
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Data.SqlClient;



namespace SongAn.QLDN.Data.QLKho.KhoSoDuTonKho
{
    public class GetListReportKhoSoDuTonKhoByCriteriaDac : BaseRepositoryDataset
    {
        #region public properties
        public string FieldsField { get; set; }

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
        public int? Skip { get; set; }

        /// <summary>
        /// Số dòng take (để phân trang)
        /// </summary>
        public int? Take { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListReportKhoSoDuTonKhoByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
            Skip = Skip != null ? Skip.Value : 0;
            //Take = Take != null ? Take.Value : 100000;
            Take = 100000;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {

        }

        #endregion

        #region execute
        /*
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
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoBaoCaoTheoKyChiTiet_DonGiaNhap",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }*/
        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public virtual DataSet Execute()
        {
            Init();
            Validate();
            List<SqlParameter> prm = new List<SqlParameter>()
            {
                 new SqlParameter("@FIELD", SqlDbType.VarChar) {Value = "*"},
                 new SqlParameter("@SEARCH_TUNGAY", DbType.String) {Value = TuNgay},
                 new SqlParameter("@SEARCH_DENNGAY",DbType.String) {Value = DenNgay},
                 new SqlParameter("@SEARCH_KHOHANGID", DbType.String) {Value = KhoHangId},
                 new SqlParameter("@SEARCH_HANGHOAID", DbType.String) {Value = HangHoaId},
                 new SqlParameter("@LOGIN_ID", DbType.String) {Value = LoginId},
                 new SqlParameter("@ORDER_CLAUSE", SqlDbType.VarChar) {Value = ""},
                 new SqlParameter("@SKIP", SqlDbType.VarChar) {Value = Skip},
                 new SqlParameter("@TAKE", SqlDbType.VarChar) {Value = Take}                 
            };

            DataSet ds = getData("sp_KhoSoDuTonKho_GetListKhoSoDuTonKhoByCriteria", prm); 
            return ds;

        }
        #endregion
    }
}
