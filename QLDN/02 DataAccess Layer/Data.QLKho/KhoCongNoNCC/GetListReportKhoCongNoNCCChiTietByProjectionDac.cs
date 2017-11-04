using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoCongNoNCC
{
    public class GetListReportKhoCongNoNCCChiTietByProjectionDac : BaseRepositoryDataset
    {
        #region public properties
        public string FieldsField { get; set; }

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string KhachHangId { get; set; }
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
        public GetListReportKhoCongNoNCCChiTietByProjectionDac(ContextDto context) : base(context.dbQLNSConnection)
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
            OrderClause = OrderClause != null? OrderClause : "";
            Skip = Skip != null ? Skip.Value : 0;
            Take = Take != null ? Take.Value : 100;
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
        public virtual DataSet Execute()
        {
            Init();
            Validate();
            List<SqlParameter> prm = new List<SqlParameter>()
            {
                 new SqlParameter("@SEARCH_TUNGAY", DbType.String) {Value = TuNgay},
                 new SqlParameter("@SEARCH_DENNGAY",DbType.String) {Value = DenNgay},
                 new SqlParameter("@SEARCH_KHACHHANGID", DbType.String) {Value = KhachHangId},
                 new SqlParameter("@LOGIN_ID", DbType.String) {Value = LoginId},
                 new SqlParameter("@ORDER_CLAUSE", SqlDbType.VarChar) {Value = OrderClause}                 
            };

            DataSet ds = getData("sp_KhoCongNoNCCChiTiet_GetListKhoCongNoNCCChiTietByCriteria", prm);
            return ds;

        }

        #endregion
    }
}
