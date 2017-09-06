/*****************************************************************************
1. Create Date  : 2017.05.12
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuongCaNhan/List
4. Description  : DAC Tính toán danh sách Bảng Lương Cá nhân theo điều kiện
5. History      : 2017.05.12(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.BangLuongCaNhan
{
    /// <summary>
    /// DAC Tính toán danh sách Bảng Lương Cá nhân theo điều kiện
    /// </summary>
    public class CalculateBangLuongCaNhanByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Bảng lương Id
        /// </summary>
        public int BANGLUONG_ID { get; set; }

        /// <summary>
        /// Người tạo id
        /// </summary>
        public int NGUOITAO_ID { get; set; }

        /// <summary>
        /// Danh sach NhanVienId can tinh toan
        /// </summary>
        public string NHANVIEN_IDS { get; set; }

        /// <summary>
        /// Ngày công
        /// </summary>
        public int? NGAYCONG { get; set; }

        /// <summary>
        /// Tiền cơm được nhận thêm mỗi ngày khi đi công tác
        /// </summary>
        public int? TIENCOMCONGTAC { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public CalculateBangLuongCaNhanByCriteriaDac(ContextDto context) : base(context.dbQLNSConnection)
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

            NGAYCONG = NGAYCONG != null ? NGAYCONG.Value : 24;

            TIENCOMCONGTAC = TIENCOMCONGTAC != null ? TIENCOMCONGTAC.Value : 70000;
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
                    var objResult = await c.QueryAsync<int>(
                        sql: "sp_BangLuongCaNhan_CalculateBangLuongCaNhanByCriteriaV2",
                        param: this,
                        commandType: CommandType.StoredProcedure);

                    return objResult.FirstOrDefault();
            });
        }

        #endregion

    }
}
