/*****************************************************************************
1. Create Date  : 2017.04.17
2. Creator      : Nguyen Ngoc Tan
3. Function     : QLDNMAIN/KhoLoaiHangHoa/KhoLoaiHangHoa
4. Description  : Goi sp de lay danh sach phong ban voi dieu kien
5. History      : 2017.04.17(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoLoaiHangHoa
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class GetKhoLoaiHangHoaByIdDac : BaseRepositoryAsync
    {
        #region public properties
        public string FIELD { get; set; }
        public string LOAI_HANG_HOA_ID { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetKhoLoaiHangHoaByIdDac(ContextDto context) : base(context.dbQLNSConnection)
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
        private void Validate() { }

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
                //p.Add("FIELD", FIELD, DbType.String);
                //p.Add("SEARCH_STRING", SEARCH_STRING, DbType.String);
                //p.Add("ORDER_CLAUSE", ORDER_CLAUSE, DbType.String);
                //p.Add("SKIP", SKIP, DbType.Int16);
                //p.Add("TAKE", TAKE, DbType.Int16);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoLoaiHangHoa_GetLoaiHangHoaById",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
