using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.QLKD.KeHoach
{
    public class UpdateKeHoachByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int KeHoachId { get; set; }
        public string KyKeHoach { get; set; }
        public string Nam { get; set; }
        public string SoPhieu { get; set; }
        public int KhachHangId { get; set; }
        public int NguoiTao { get; set; }
        public string UserId { get; set; }
        public DataTable MyTable_KeHoachChiTiet { get; set; }

        #endregion

        #region private variable

        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateKeHoachByIdDac(ContextDto context) : base(context.dbQLKDConnection)
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
                p.Add("KeHoachId", KeHoachId, DbType.Int32);
                p.Add("KyKeHoach", KyKeHoach, DbType.String);
                p.Add("Nam", Nam, DbType.String);
                p.Add("SoPhieu", SoPhieu, DbType.String);
                p.Add("KhachHangId", KhachHangId, DbType.Int32);
                p.Add("NguoiTao", NguoiTao, DbType.Int32);
                p.Add("UserId", UserId, DbType.String);
                p.Add("@MyTableType_KeHoachChiTiet", MyTable_KeHoachChiTiet.AsTableValuedParameter());

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_KD_KeHoach_UpdateKeHoachById",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
