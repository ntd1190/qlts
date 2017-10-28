/*****************************************************************************
1. Create Date  : 2017.04.17
2. Creator      : Nguyen Ngoc Tan
3. Function     : QLDNMAIN/DuAn/DuAn
4. Description  : Goi sp de lay danh sach phong ban voi dieu kien
5. History      : 2017.04.17(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.ThongSo
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class UpdateInsertThongSoDac : BaseRepositoryAsync
    {
        #region public properties

        public int ThongSoId { get; set; }
        public string Loai { get; set; }
        public string Ten { get; set; }
        public string TaiSan { get; set; }
        public int NhanVienId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateInsertThongSoDac(ContextDto context) : base(context.dbQLTSConnection)
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
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters(this);
               
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_ThongSo_UpdateInsert",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
