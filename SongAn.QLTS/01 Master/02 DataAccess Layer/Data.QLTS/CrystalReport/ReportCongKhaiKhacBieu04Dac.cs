using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SongAn.QLTS.Data.QLTS.CrystalReport
{
    public class ReportCongKhaiKhacBieu04Dac : BaseRepositoryDataset
    {
        #region public properties

        public string Year { get; set; }
        public string LoaiKeKhai { get; set; }
        public string COSO_ID { get; set; }
        public string NHANVIEN_ID { get; set; }

        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public ReportCongKhaiKhacBieu04Dac(ContextDto context) : base(context.dbQLTSConnection)
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
                 new SqlParameter("@Year", SqlDbType.VarChar) {Value = Year},
                 new SqlParameter("@LoaiKeKhai", SqlDbType.VarChar) {Value = LoaiKeKhai},
                 new SqlParameter("@COSO_ID", SqlDbType.VarChar) {Value = COSO_ID},
                 new SqlParameter("@NHANVIEN_ID", SqlDbType.VarChar) {Value = NHANVIEN_ID},
            };
            DataSet ds = getData("sp_CongKhai_report_KhacBieu04", prm);
            return ds;

        }

        #endregion
    }
}
