using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoImportExcelDauKy
{
    public class ImportExcelDauKyDac : BaseRepositoryAsync
    {
        #region public properties
        public int KY_ID { get; set; }
        public int KHO_HANG_ID { get; set; }
        public int HANG_HOA_ID { get; set; }
        public string MA_HANG_HOA { get; set; }
        public decimal SL_TON_DAU { get; set; }
        public decimal GT_TON_DAU { get; set; }
        public decimal SL_NHAP_TRONG_KY { get; set; }
        public decimal GT_NHAP_TRONG_KY { get; set; }
        public decimal SL_XUAT_TRONG_KY { get; set; }
        public decimal DG_XUAT_BINH_QUAN { get; set; }
        public decimal SL_TON_CUOI { get; set; }
        public decimal GT_TON_CUOI { get; set; }
        public int XOA { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public ImportExcelDauKyDac(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init() { }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate() { }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoBaoCaoTheoKyChiTiet_InsertDataFromExcel",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
