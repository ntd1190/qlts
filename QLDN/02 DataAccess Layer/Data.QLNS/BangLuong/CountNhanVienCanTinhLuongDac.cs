/*****************************************************************************
1. Create Date  : 2017.05.18
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuong/List
4. Description  : DAC Đếm số người cần tính lương
5. History      : 2017.05.18(Tran Quoc Hung) - Tạo mới
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Linq;

namespace SongAn.QLDN.Data.QLNS.BangLuong
{
    /// <summary>
    /// DAC Đếm số người cần tính lương
    /// </summary>
    public class CountNhanVienCanTinhLuongDac : BaseRepositoryAsync
    {
        #region public properties

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public CountNhanVienCanTinhLuongDac(ContextDto context) : base(context.dbQLNSConnection)
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
        public virtual async Task<int> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var objResult = (await c.QueryAsync<int>(
                    sql: "sp_BangLuong_CountNhanVienCanTinhLuong",
                    param: this,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();

                return objResult;
            });
        }

        #endregion

    }
}
