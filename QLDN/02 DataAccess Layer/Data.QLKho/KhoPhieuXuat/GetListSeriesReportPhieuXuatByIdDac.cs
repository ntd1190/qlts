using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;


namespace SongAn.QLDN.Data.QLKho.KhoPhieuXuat
{
    public class GetListSeriesReportPhieuXuatByIdDac : BaseRepositoryDataset
    {
        #region public properties

        public string PhieuXuatId { get; set; }
        public string isSeriesAuto { get; set; }
        public string LoginId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListSeriesReportPhieuXuatByIdDac(ContextDto context) : base(context.dbQLNSConnection)
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
        public virtual DataSet Execute()
        {
            Init();
            Validate();
            List<SqlParameter> prm = new List<SqlParameter>()
            {
                 new SqlParameter("@PHIEU_XUAT_ID", SqlDbType.VarChar) {Value = PhieuXuatId},
                 new SqlParameter("@IS_SERIES_AUTO", SqlDbType.VarChar) {Value = isSeriesAuto},
                 new SqlParameter("@LOGIN_ID", SqlDbType.VarChar) {Value = LoginId},
            };
            DataSet ds = getData("sp_KhoPhieuXuat_GetListSeriesReportPhieuXuatById", prm);
            return ds;

        }

        #endregion
    }
}
