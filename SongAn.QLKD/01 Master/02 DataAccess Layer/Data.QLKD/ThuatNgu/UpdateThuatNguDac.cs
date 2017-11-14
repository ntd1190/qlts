using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.QLKD.ThuatNgu
{
    public class UpdateThuatNguDac : BaseRepositoryAsync
    {
        #region public properties

        public virtual Entity.QLKD.Entity.KDThuatNgu ThuatNgu { get; set; }

        public virtual int USER_ID { get; set; }
        public virtual int NHANVIEN_ID { get; set; }
        public virtual string MESSAGE { get; set; }
        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateThuatNguDac(ContextDto context) : base(context.dbQLKDConnection)
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
                var p = new DynamicParameters(ThuatNgu);
                p.Add("@USER_ID", USER_ID, dbType: DbType.Int32);
                p.Add("@NHANVIEN_ID", NHANVIEN_ID, dbType: DbType.Int32);
                p.Add("@MESSAGE", MESSAGE, dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KD_ThuatNgu_Update",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion
    }
}
