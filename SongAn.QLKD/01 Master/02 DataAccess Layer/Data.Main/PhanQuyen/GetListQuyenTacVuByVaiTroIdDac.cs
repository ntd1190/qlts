/*****************************************************************************
1. Create Date  : 2017.08.05
2. Creator      : Nguyen Ngoc Tan
3. Function     : Phân Quyền
4. Description  : call sp to get danh sach quyen tac vu bang vaitroid
5. History      : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Data.Main.PhanQuyen.Dto;
using SongAn.QLKD.Util.Common.Dto;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Main.PhanQuyen
{
    public class GetListQuyenTacVuByVaiTroIdDac : Util.Common.Repository.BaseRepository
    {
        #region public properties

        /// <summary>
        /// Vai Trò Id
        /// </summary>
        public int VAITROID { get; set; }

        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListQuyenTacVuByVaiTroIdDac(ContextDto context) : base(context.dbMainConnection)
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
        public virtual IEnumerable<QuyenTacVuDto> Execute()
        {
            Init();
            Validate();

            return WithConnection(c =>
            {
                var objResult = c.Query<QuyenTacVuDto>(
                    sql: "sp_PhanQuyen_GetListQuyenTacVuBangVaiTroId",
                    param: this,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
