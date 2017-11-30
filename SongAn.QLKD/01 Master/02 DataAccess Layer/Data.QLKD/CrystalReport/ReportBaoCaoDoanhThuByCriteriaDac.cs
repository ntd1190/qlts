
using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;


namespace SongAn.QLKD.Data.QLKD.CrystalReport
{
    public class ReportBaoCaoDoanhThuByCriteriaDac : BaseRepositoryDataset
    {
        #region public properties

        public string UserId { get; set; }

        public string NhanVienId { get; set; }

        public string Search { get; set; }
        public string SearchLoaiHopDongId { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string OrderClause { get; set; }

        public int? Skip { get; set; }

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
        public ReportBaoCaoDoanhThuByCriteriaDac(ContextDto context) : base(context.dbQLKDConnection)
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
        public virtual DataSet ExecuteDac()
        {
            Init();
            Validate();

            List<SqlParameter> prm = new List<SqlParameter>()
            {
                 new SqlParameter("@UserId", SqlDbType.VarChar) {Value = UserId},
                 new SqlParameter("@NhanVienId", SqlDbType.VarChar) {Value = NhanVienId},
                 new SqlParameter("@Search", SqlDbType.VarChar) {Value = Search},
                 new SqlParameter("@SearchLoaiHopDongId", SqlDbType.VarChar) {Value = SearchLoaiHopDongId},
                 new SqlParameter("@TuNgay", SqlDbType.DateTime) {Value = TuNgay},
                 new SqlParameter("@DenNgay", SqlDbType.DateTime) {Value = DenNgay},
                 new SqlParameter("@OrderClause", SqlDbType.VarChar) {Value = OrderClause},
                 new SqlParameter("@Skip", SqlDbType.VarChar) {Value = Skip},
                 new SqlParameter("@Take", SqlDbType.Int) {Value = 10000}
            };
            DataSet ds = getData("sp_KD_BaoCaoDoanhThu_GetListBaoCaoDoanhThuByCriteria", prm);
            return ds;

        }

        #endregion
    }
}
