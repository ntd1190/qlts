/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi sp de lay danh sach Nghi Phep voi dieu kien
5. History      : 2017.04.15(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.NghiPhep
{
    /// <summary>
    /// DAC Lấy danh sách Nghỉ phép theo điều kiện
    /// </summary>
    public class GetListNghiPhepByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public string LOGIN_ID { get; set; }
        /// <summary>
        /// Mã Form
        /// </summary>
        public string MA_FORM { get; set; }

        /// <summary>
        /// Danh sách các field cần lấy
        /// </summary>
        public string FIELD { get; set; }

        /// <summary>
        /// Chuỗi QUICK SEARCH
        /// </summary>
        public string SEARCH_STRING { get; set; }

        /// <summary>
        /// Loại phép ID
        /// </summary>
        public string LOAI_PHEP { get; set; }

        /// <summary>
        /// Người duyệt ID
        /// </summary>
        public string NGUOI_DUYET { get; set; }

        /// <summary>
        /// Trạng thái ID
        /// </summary>
        public string TRANG_THAI { get; set; }

        /// <summary>
        /// Ngày bắt đầu.
        /// </summary>
        public string NGAY_BAT_DAU { get; set; }

        /// <summary>
        /// Ngày kết thúc.
        /// </summary>
        public string NGAY_KET_THUC { get; set; }

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
        public GetListNghiPhepByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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
                //var p = new DynamicParameters();
                //p.Add("MA_FORM", MA_FORM, DbType.String);
                //p.Add("FIELD", FIELD, DbType.String);
                //p.Add("SEARCH_STRING", SEARCH_STRING, DbType.String);

                //p.Add("SKIP", SKIP, DbType.Int16);
                //p.Add("TAKE", TAKE, DbType.Int16);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_NghiPhep_GetListNghiPhepByCriteria",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
