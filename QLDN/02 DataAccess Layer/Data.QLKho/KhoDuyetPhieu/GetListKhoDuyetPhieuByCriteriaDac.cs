/*****************************************************************************
1. Create Date  : 2017.06.13
2. Creator      : NGUYỄN NGỌC TÂN
3. Function     : 
4. Description  : GỌI SP LẤY DANH SÁCH PHIẾU CHUYỂN
5. History      : 2017.06.13 (NGUYỄN NGỌC TÂN) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoDuyetPhieu
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class GetListKhoDuyetPhieuByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public string FIELD { get; set; }
        public string SEARCH_STRING { get; set; }
        public string START_DATE { get; set; }
        public string END_DATE { get; set; }
        public string LOAI_PHIEU { get; set; }
        public string KHO_HANG { get; set; }
        public string TRANG_THAI { get; set; }
        public string ORDER_CLAUSE { get; set; }
        public string LOGIN_ID { get; set; }
        public int? SKIP { get; set; }
        public int? TAKE { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListKhoDuyetPhieuByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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

            SKIP = SKIP != null ? SKIP.Value : 0;

            TAKE = TAKE != null ? TAKE.Value : 100;
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
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoDuyetPhieu_GetListKhoDuyetPhieuByCriteria",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
