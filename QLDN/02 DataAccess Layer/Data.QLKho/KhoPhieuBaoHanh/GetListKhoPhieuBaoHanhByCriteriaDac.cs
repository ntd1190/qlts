/*****************************************************************************
1. Create Date  : 2017.07.27
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : DANH SÁCH PHIẾU BẢO HÀNH
5. History      : 2017.07.27 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoPhieuBaoHanh
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class GetListKhoPhieuBaoHanhByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public string FIELD { get; set; }
        public string SERIES { get; set; }
        public string DIENTHOAI { get; set; }
        public string THONG_TIN_KHACH_HANG { get; set; }
        public string SAN_PHAM_CTY { get; set; }
        public DateTime? START_DATE { get; set; }
        public DateTime? END_DATE { get; set; }
        public string ORDER_CLAUSE { get; set; }
        public int? SKIP { get; set; }
        public int? TAKE { get; set; }
        public string MA_FORM { get; set; }
        public int LOGIN_ID { get; set; }
        public string MESSAGE { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListKhoPhieuBaoHanhByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
                var p = new DynamicParameters(this);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoPhieuBaoHanh_GetListKhoPhieuBaoHanhByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}
