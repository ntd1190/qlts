using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;


namespace SongAn.QLDN.Data.QLNS.ChamCong
{
    public class CheckNghiByProjectionDac : BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// tìm kiếm quick search
        /// </summary>


        /// <summary>
        /// Danh sách issue khách hàng
        /// </summary>
        ///  
        public string Ngay { get; set; }

        public string NhanVien { get; set; }


        /// <summary>
        /// Mệnh đề order by
        /// </summary>

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public CheckNghiByProjectionDac(ContextDto context) : base(context.dbQLNSConnection)
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
                p.Add("NGAY", Ngay, DbType.String);
                p.Add("NHANVIENID", NhanVien, DbType.String);
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_ChamCong_CheckNghiByChamCong",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
