using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.KhoPhieuXuat
{
    public class GetListKhoPhieuXuatByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties

        public virtual string SEARCH { get; set; }
        public virtual string SOPHIEU { get; set; }
        public virtual string KHOPHIEUXUATID { get; set; }
        public virtual string COSOID { get; set; }
        public virtual string NHANVIENID { get; set; }
        public virtual string STARTDATE { get; set; }
        public virtual string ENDDATE { get; set; }
        public virtual string KHOTAISANID { get; set; }

        public virtual string FIELD { get; set; }
        public virtual string ORDERCLAUSE { get; set; }
        public virtual int SKIP { get; set; }
        public virtual int TAKE { get; set; }

        public virtual int COSO_ID { get; set; }
        public virtual int NHANVIEN_ID { get; set; }
        public virtual string FUNCTIONCODE { get; set; }
        public virtual string MESSAGE { get; set; }

        #endregion
        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        public GetListKhoPhieuXuatByCriteriaDac(ContextDto context) : base(context.dbQLTSConnection)
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
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters(this);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_KhoPhieuXuat_GetListKhoPhieuXuatByCriteria",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }
        #endregion
    }
}
