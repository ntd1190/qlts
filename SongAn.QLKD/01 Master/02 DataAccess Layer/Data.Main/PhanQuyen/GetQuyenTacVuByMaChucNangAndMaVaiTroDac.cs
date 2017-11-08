/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Nguyen Ngoc Tan
3. Function     : Phân Quyền
4. Description  : Lấy Quyền tác vụ theo MaChucNang và MaVaiTro
5. History      : 2017.04.15(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Data.Main.PhanQuyen.Dto;
using SongAn.QLKD.Util.Common.Dto;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Main.PhanQuyen
{
    public class GetQuyenTacVuByMaChucNangAndMaVaiTroDac : Util.Common.Repository.BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Mã Chức Năng
        /// </summary>
        public string MACHUCNANG { get; set; }

        /// <summary>
        /// Mã Vai trò
        /// </summary>
        public string MAVAITRO { get; set; }

        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetQuyenTacVuByMaChucNangAndMaVaiTroDac(ContextDto context) : base(context.dbMainConnection)
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
        public virtual async Task<QuyenTacVuDto> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var objResult = await c.QueryAsync<QuyenTacVuDto>(
                    sql: "sp_PhanQuyen_GetQuyenTacVuByMaChucNangAndMaVaiTro",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult.FirstOrDefault();
            });
        }

        #endregion

    }
}
