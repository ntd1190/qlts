/*****************************************************************************
1. Create Date  : 2017.09.12
2. Creator      : HOI
3. Function     : QLDNKHO/KHOKIEMKE/REPORT
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



namespace SongAn.QLDN.Data.QLKho.KhoXuatNhapTon
{
    public class GetListReportKhoXuatNhapTonByCriteriaDac : BaseRepositoryDataset
    {
        #region public properties

        public string TU_NGAY { get; set; }

        public string DEN_NGAY { get; set; }

        public string KHO_ID { get; set; }
        public string HANG_HOA_ID { get; set; }
        public string NHOM_HANG_HOA_ID { get; set; }
        public string LOGIN_ID { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListReportKhoXuatNhapTonByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
                 new SqlParameter("@KHO_ID", SqlDbType.VarChar) {Value = KHO_ID},
                 new SqlParameter("@TU_NGAY", SqlDbType.VarChar) {Value = TU_NGAY},
                 new SqlParameter("@DEN_NGAY", SqlDbType.VarChar) {Value = DEN_NGAY},
                 new SqlParameter("@HANG_HOA_ID", SqlDbType.VarChar) {Value = HANG_HOA_ID},
                 new SqlParameter("@NHOM_HANG_HOA_ID", SqlDbType.VarChar) {Value = NHOM_HANG_HOA_ID},
                 new SqlParameter("@LOGIN_ID", SqlDbType.VarChar) {Value = LOGIN_ID},
            };

            DataSet ds = getData("sp_KhoBaoCaoTheoKyChiTiet_DonGiaNhap", prm);
            return ds;

        }
        #endregion
    }
}
