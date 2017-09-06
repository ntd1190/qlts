/*****************************************************************************
1. Create Date  : 2017.08.10
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/NHANVIEN/EDIT
4. Description  : XÓA THÔNG TIN CÔNG VIỆC TRƯỚC ĐÂY
5. History      : 2017.08.10 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLNS.CongViecTruocDay
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class DeleteCongViecTruocDayDac : BaseRepositoryAsync
    {
        #region public properties
        public int CongViecTruocDayId { get; set; }
        public int CtrVersion { get; set; }
        public int LOGIN_ID { get; set; }
        public string MESSAGE { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public DeleteCongViecTruocDayDac(ContextDto context) : base(context.dbQLNSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init() { }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
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
                var p = new DynamicParameters(this);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_CongViecTruocDay_DeleteCongViecTruocDay",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}
