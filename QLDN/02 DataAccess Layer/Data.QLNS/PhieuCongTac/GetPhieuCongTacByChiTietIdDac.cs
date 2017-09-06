/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi sp de lay danh sach Nghi Phep voi dieu kien
5. History      : 2017.04.15(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Data.QLNS.PhieuCongTac.Dto;
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
    public class GetPhieuCongTacByChiTietIdDac : BaseRepositoryAsync
    {
        #region public properties
        public int CHI_TIET_ID { get; set; }
        public string XOA { get; set; }
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
        public GetPhieuCongTacByChiTietIdDac(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init(){
            ORDER_CLAUSE = Protector.String(ORDER_CLAUSE, "MAXCNT");

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
        public virtual async Task<IEnumerable<GetPhieuCongTacByChiTietIdDto>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<GetPhieuCongTacByChiTietIdDto>(
                    sql: "sp_PhieuCongTac_GetPhieuCongTacByChiTietId",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
