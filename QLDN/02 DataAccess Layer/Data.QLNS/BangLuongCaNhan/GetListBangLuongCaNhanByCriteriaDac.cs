/*****************************************************************************
1. Create Date  : 2017.05.12
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuongCaNhan/List
4. Description  : DAC Lấy danh sách Bảng Lương Cá nhân theo điều kiện
5. History      : 2017.05.12(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.BangLuongCaNhan
{
    /// <summary>
    /// DAC Lấy danh sách Bảng Lương Cá nhân theo điều kiện
    /// </summary>
    public class GetListBangLuongCaNhanByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Bảng lương Id
        /// </summary>
        public string BANGLUONG_ID { get; set; }

        /// <summary>
        /// Nhân viên Id
        /// </summary>
        public string NHANVIEN_ID { get; set; }

        /// <summary>
        /// Mã trạng thái
        /// </summary>
        public string MA_TRANG_THAI { get; set; }

        /// <summary>
        /// Ngày bắt đầu.
        /// </summary>
        public string NGAY_BAT_DAU { get; set; }

        /// <summary>
        /// Ngày kết thúc.
        /// </summary>
        public string NGAY_KET_THUC { get; set; }

        /// <summary>
        /// Xóa YN
        /// </summary>
        public string XOA_YN { get; set; }
        
        /// <summary>
        /// Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
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
        public GetListBangLuongCaNhanByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_BangLuongCaNhan_GetListBangLuongCaNhanByCriteria",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
