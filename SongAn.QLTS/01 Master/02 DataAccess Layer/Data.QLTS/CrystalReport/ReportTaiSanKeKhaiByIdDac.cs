using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.CrystalReport
{
    public class ReportTaiSanKeKhaiDatDac : BaseRepositoryDataset
    {
        #region public properties

        public string TaiSanId { get; set; }
        public string LoaiKeKhai { get; set; }

        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public ReportTaiSanKeKhaiDatDac(ContextDto context) : base(context.dbQLTSConnection)
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
                 new SqlParameter("@TaiSanId", SqlDbType.VarChar) {Value = TaiSanId},
                 new SqlParameter("@LoaiKeKhai", SqlDbType.VarChar) {Value = LoaiKeKhai},

            };
            DataSet ds = getData("sp_TaiSan_report_KeKhaiDat", prm);
            return ds;

        }

        #endregion
    }
}
