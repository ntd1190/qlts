/*****************************************************************************
1. Create Date  : 2017.05.17
2. Creator      : Nguyễn Thanh Bình
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi sp de lay danh sach quá trình công tác của nhân viên
5. History      : 2017.05.17(Nguyễn Thanh Bình) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Data.QLNS.QuaTrinhCongTac.Dto;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.PhieuCongTac
{
    /// <summary>
    /// DAC Lấy danh sách Nghỉ phép theo điều kiện
    /// </summary>
    public class GetListQuaTrinhCongTacByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public int NHAN_VIEN_ID { get; set; }
        public int QUA_TRINH_CONG_TAC_ID { get; set; }
        /// <summary>
        /// Mệnh đề order by
        /// </summary>
        public string ORDER_CLAUSE { get; set; }

        /// <summary>
        /// Số dòng skip (để phân trang)
        /// </summary>
        public int? SKIP { get; set; }

        /// <summary>
        /// Số dòng take (để phân trang)
        /// </summary>
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
        public GetListQuaTrinhCongTacByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
            ORDER_CLAUSE = Protector.String(ORDER_CLAUSE, "MAXCNT");
            SKIP = Protector.Int(SKIP, 0);
            TAKE = Protector.Int(TAKE, 100);
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
        public virtual async Task<IEnumerable<QuaTrinhCongTacDto>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                var objResult = await c.QueryAsync<QuaTrinhCongTacDto>(
                    sql: "sp_QuaTrinhCongTac_GetListQuaTrinhCongTacByCriteria",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
