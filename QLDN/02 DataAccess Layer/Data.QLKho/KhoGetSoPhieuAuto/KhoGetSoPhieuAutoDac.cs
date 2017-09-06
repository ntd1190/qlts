/*****************************************************************************
1. Create Date  : 2017.06.13
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : GỌI SP LẤY DANH SÁCH PHIẾU NHẬP
5. History      : 2017.06.13 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoGetSoPhieuAuto
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class KhoGetSoPhieuAutoDac : BaseRepositoryAsync
    {
        #region public properties
        public string LOAI_PHIEU { get; set; }
        public string SOPHIEU { get; set; }
        public int LOGIN_ID { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public KhoGetSoPhieuAutoDac(ContextDto context) : base(context.dbQLNSConnection)
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
                p.Add("@SOPHIEU", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoGetSoPhieu_Auto",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                SOPHIEU = p.Get<string>("SOPHIEU");

                return objResult;
            });
        }

        #endregion

    }
}
