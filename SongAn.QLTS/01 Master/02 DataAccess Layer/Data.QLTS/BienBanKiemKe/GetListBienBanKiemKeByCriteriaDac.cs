using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLNS.BienBanKiemKe
{
    public class GetListBienBanKiemKeByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties


        public int CoSoId { get; set; }
        public string Search { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string SoChungTu { get; set; }
        public string PhongBanId { get; set; }
        public int LoginId { get; set; }
        public string OrderClause { get; set; }

        public int? Skip { get; set; }
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
        public GetListBienBanKiemKeByCriteriaDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("CoSoId", CoSoId, DbType.Int32);
                p.Add("Search", Search, DbType.String);
                p.Add("TuNgay", TuNgay, DbType.DateTime);
                p.Add("DenNgay", DenNgay, DbType.DateTime);
                p.Add("SoChungTu", SoChungTu, DbType.String);
                p.Add("PhongBanId", PhongBanId, DbType.String);
                p.Add("LoginId", LoginId, DbType.Int32);
                p.Add("OrderClause", OrderClause, DbType.String);
                p.Add("Skip", Skip, DbType.Int16);
                p.Add("Take", Take, DbType.Int16);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_BienBanKiemKe_GetListBienBanKiemKeByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
