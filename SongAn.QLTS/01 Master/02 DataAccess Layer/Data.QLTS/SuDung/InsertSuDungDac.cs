using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.SuDung
{
    public class InsertSuDungDac : BaseRepositoryAsync
    {
        #region public properties

        public int KyLap { get; set; }
        public decimal Nam { get; set; }
        public string NoiDung { get; set; }
        public int NguoiTao { get; set; }
        public int CtrVersion { get; set; }
        public int CoSoId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertSuDungDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("KyLap", KyLap, DbType.Int32);
                p.Add("Nam", Nam, DbType.Decimal);
                p.Add("NoiDung", NoiDung, DbType.String);
                p.Add("CoSoId", CoSoId, DbType.Int32);
                p.Add("NguoiTao", NguoiTao, DbType.Int32);
                p.Add("CtrVersion", CtrVersion, DbType.Int32);

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_SuDung_InsertSuDung",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
