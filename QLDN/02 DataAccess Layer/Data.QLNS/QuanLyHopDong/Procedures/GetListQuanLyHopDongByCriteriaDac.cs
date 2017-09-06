/*****************************************************************************
1. Create Date  : 2017.05.22
2. Creator      : Nguyễn Thanh Bình
3. Function     : QLDNMAIN/nhanvien/edit
4. Description  : Gọi sp lấy danh sach thông tin hợp đồng của nhân viên
5. History      : 2017.05.22(Nguyễn Thanh Bình) - Tao moi
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

namespace SongAn.QLDN.Data.QLNS.QuanLyHopDong
{
    /// <summary>
    /// DAC Lấy danh sách Nghỉ phép theo điều kiện
    /// </summary>
    public class GetListQuanLyHopDongByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public int NHAN_VIEN_ID { get; set; }
        public int HOP_DONG_ID { get; set; }
        public int LOGIN_ID { get; set; }
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
        public GetListQuanLyHopDongByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_QuanLyHopDong_GetListQuanLyHopDongByCriteria",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
