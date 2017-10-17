using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.CrystalReport
{
    public class ReportTongHopSoTSCDBieuS21Dac : BaseRepositoryDataset
    {
        #region public properties

        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }

        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public ReportTongHopSoTSCDBieuS21Dac(ContextDto context) : base(context.dbQLTSConnection)
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
                 new SqlParameter("@TuNgay", SqlDbType.DateTime) {Value = TuNgay},
                 new SqlParameter("@DenNgay", SqlDbType.DateTime) {Value = DenNgay},
                 new SqlParameter("@CoSoId", SqlDbType.Int) {Value = CoSoId},
                 new SqlParameter("@NhanVienId", SqlDbType.Int) {Value = NhanVienId},

            };
            DataSet ds = getData("sp_BaoCao_BaoCaoTongHopSoTaiSanCoDinhBieuS21", prm);
            return ds;

        }

        #endregion
    }
}
