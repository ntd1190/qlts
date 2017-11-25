using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.QLKD.HopDong
{
    public class InsertHopDongChiTietDac : BaseRepositoryAsync
    {
        #region public properties

        public virtual Entity.QLKD.Entity.KDHopDongChiTiet HopDongChiTiet { get; set; }

        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertHopDongChiTietDac(ContextDto context) : base(context.dbQLKDConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
            _context = context;
        }
        #endregion

        #region init & validate
        private void Init() { }
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
                var p = new DynamicParameters(HopDongChiTiet);


                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KD_HopDongChiTiet_Insert",
                    param: p,
                    commandType: CommandType.StoredProcedure);
                return objResult;
            });
        }
        #endregion
    }
}
