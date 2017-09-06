/*****************************************************************************
1. Create Date  : 2017.04.17
2. Creator      : Nguyen Thanh Binh
3. Function     : QLDNMAIN/NhanVien/List
4. Description  : Goi sp de lay danh sach Nhan vien voi dieu kien
5. History      : 2017.04.17(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.NhanVien
{
    /// <summary>
    /// DAC Lấy danh sách Nhan vien theo điều kiện
    /// </summary>
    public class GetListNhanVienByCriteriaListDac : BaseRepositoryAsync
    {
        #region public properties
        /// <summary>
        /// mã form
        /// </summary>
        public string MA_FORM { get; set; }

        /// <summary>
        /// Danh sách các field cần lấy
        /// </summary>
        public string FIELD { get; set; }

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string SEARCH_STRING { get; set; }

        /// <summary>
        /// tìm kiếm theo ngày tuyển dụng
        /// </summary>
        public DateTime? NGAY_FROM  { get; set; }
        public DateTime? NGAY_TO { get; set; }

        /// <summary>
        /// Danh sách nhân viên ID
        /// </summary>
        public string NHAN_VIEN { get; set; }

        /// <summary>
        /// Danh sách phòng ban
        /// </summary>
        public string PHONG_BAN { get; set; }

        /// <summary>
        /// Danh sách dự án
        /// </summary>
        public string DU_AN { get; set; }

        /// <summary>
        /// Danh sách chức vụ
        /// </summary>
        public string CHUC_VU { get; set; }

        /// <summary>
        /// trạng thái đang làm việc (true|false)
        /// </summary>
        public bool? DANG_LAM_VIEC { get; set; }

        /// <summary>
        /// mã trạng thái
        /// </summary>
        public string MA_TRANG_THAI { get; set; }

        /// <summary>
        /// điều kiện xóa logic
        /// </summary>
        public string XOA { get; set; }

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
        public GetListNhanVienByCriteriaListDac(ContextDto context) : base(context.dbQLNSConnection)
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
            FIELD = FIELD.Equals("") ? "" : FIELD;

            ORDER_CLAUSE = ORDER_CLAUSE.Equals("") ? "MAXCNT" : ORDER_CLAUSE;

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
                    sql: "sp_NhanVien_GetListNhanVienByCriteriaList",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
