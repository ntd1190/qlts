/*****************************************************************************
1. Create Date  : 2017.09.01
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : 
5. History      : 2017.09.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.PhuongThuc
{
    public class GetListcbxPhuongThucByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
        public string Search { get; set; }
        #endregion
        #region private variable
        ContextDto _context;
        #endregion
        #region init & validate
        private void Init() { }
        private void Validate() { }
        #endregion

        #region constructor
        public GetListcbxPhuongThucByCriteriaDac(ContextDto context) : base(context.dbQLTSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion


        #region execute
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters();
                p.Add("CoSoId", CoSoId, DbType.String);
                p.Add("NhanVienId", NhanVienId, DbType.String);
                p.Add("Search", Search, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_PhuongThuc_cbxPhuongThucByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }
        #endregion

    }
}
