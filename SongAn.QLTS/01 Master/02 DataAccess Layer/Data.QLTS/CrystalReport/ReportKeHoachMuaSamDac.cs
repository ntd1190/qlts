using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;


namespace SongAn.QLTS.Data.QLTS.CrystalReport
{
    public class ReportKeHoachMuaSamDac : BaseRepositoryDataset
    {
        #region public properties

        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string PhongBan { get; set; }
        public string NhanVien { get; set; }
        public string LoginId { get; set; }

        #endregion

        #region private variable

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public ReportKeHoachMuaSamDac() 
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
                 new SqlParameter("@SEARCH_TUNGAY", SqlDbType.VarChar) {Value = TuNgay},
                 new SqlParameter("@SEARCH_DENNGAY", SqlDbType.VarChar) {Value = DenNgay},
                 new SqlParameter("@SEARCH_PHONGBAN", SqlDbType.VarChar) {Value = PhongBan},
                 new SqlParameter("@SEARCH_NHANVIEN", SqlDbType.VarChar) {Value = NhanVien},
                 new SqlParameter("@LOGIN_ID", SqlDbType.VarChar) {Value = LoginId},
            };
            DataSet ds = getData("sp_CongViec_GetListBaoCaoCongViecByCriteria", prm);
            return ds;

        }

        #endregion
    }
}
