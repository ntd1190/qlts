using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.CrystalReport
{
    public class ReportDeNghiTrangCapByIdDac : BaseRepositoryDataset
    {
        #region public properties

        public string DeNghiId { get; set; }

        #endregion

        #region private variable

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public ReportDeNghiTrangCapByIdDac()
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
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
                 new SqlParameter("@DeNghiId", SqlDbType.VarChar) {Value = DeNghiId},

            };
            DataSet ds = getData("sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById", prm);
            return ds;

        }

        #endregion
    }
}
