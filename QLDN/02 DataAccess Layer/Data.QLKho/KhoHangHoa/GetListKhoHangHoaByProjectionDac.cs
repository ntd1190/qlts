using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoHangHoa
{
    public class GetListKhoHangHoaByProjectionDac : BaseRepositoryAsync
    {
        #region public properties
        public string FieldsField { get; set; }

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>
        public string SearchString { get; set; }

        /// <summary>
        /// Danh sách hang hoa
        /// </summary>
        ///  
        public string LoginId { get; set; }
        public string TuKhoa { get; set; }
        public string HangHoa { get; set; }
        public string Nhom { get; set; }
        public string Loai { get; set; }
        public string NhaCungCap { get; set; }
        public string HangSanXuat { get; set; }
        public string NuocSanXuat { get; set; }
        /// <summary>
        /// Mệnh đề order by
        /// </summary>
        public string OrderClause { get; set; }

        /// <summary>
        /// Số dòng skip (để phân trang)
        /// </summary>
        public int? Skip { get; set; }

        /// <summary>
        /// Số dòng take (để phân trang)
        /// </summary>
        public int? Take { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListKhoHangHoaByProjectionDac(ContextDto context) : base(context.dbQLNSConnection)
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

            Skip = Skip != null ? Skip.Value : 0;

            Take = Take != null ? Take.Value : 100;
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
                p.Add("FIELD", FieldsField, DbType.String);
                p.Add("SEARCH_TUKHOA", TuKhoa, DbType.String);
                p.Add("SEARCH_HANGHOA", HangHoa, DbType.String);
                p.Add("SEARCH_NHOM", Nhom, DbType.String);
                p.Add("SEARCH_LOAI", Loai, DbType.String);
                p.Add("SEARCH_NHACUNGCAP", NhaCungCap, DbType.String);
                p.Add("SEARCH_HANGSANXUAT", HangSanXuat, DbType.String);
                p.Add("SEARCH_NUOCSANXUAT", NuocSanXuat, DbType.String);
                p.Add("ORDER_CLAUSE", OrderClause, DbType.String);
                p.Add("SKIP", Skip, DbType.Int16);
                p.Add("TAKE", Take, DbType.Int16);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoHangHoa_GetListKhoHangHoaByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
