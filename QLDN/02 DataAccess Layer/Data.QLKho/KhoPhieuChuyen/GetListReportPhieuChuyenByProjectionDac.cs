using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;


namespace SongAn.QLDN.Data.QLKho.KhoPhieuChuyen
{
    public class GetListReportPhieuChuyenByProjectionDac : BaseRepositoryDataset
    {
        #region public properties

        public string PhieuChuyenId { get; set; }
       

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListReportPhieuChuyenByProjectionDac(ContextDto context) : base(context.dbQLNSConnection)
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
                 new SqlParameter("@SEARCH_PhieuChuyenID", SqlDbType.VarChar) {Value = PhieuChuyenId},
                
            };
            DataSet ds = getData("sp_KhoPhieuChuyen_GetListReportPhieuChuyenByCriteria", prm);
            return ds;

        }

        #endregion
    }
}
