/*****************************************************************************
1. Create Date  : 2017.03.30
2. Creator      : Tran Quoc Hung
3. Function     : Phân Quyền
4. Description  : call sp to get danh sach quyen tac vu bang vaitroid
5. History      : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Data.Main.PhanQuyen.Dto;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Main.PhanQuyen
{
    public class GetListChucNangByVaiTroIdDac : Util.Common.Repository.BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Vai Trò Id
        /// </summary>
        public int VaiTroId { get; set; }
        public string Loai { get; set; }
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListChucNangByVaiTroIdDac(ContextDto context) : base(context.dbMainConnection)
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
                var p = new DynamicParameters();
                p.Add("VAITROID", VaiTroId, DbType.String);
                p.Add("LOAI", Loai, DbType.String);
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_PhanQuyen_GetListChucNang",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
