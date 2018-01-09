using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;


namespace SongAn.QLKD.Data.QLKD.Bill
{
    public class UpdateBillByIdDac : BaseRepositoryAsync
    {
        #region public properties
        public int BillId { get; set; }
        public string SoBill { get; set; }
        public string NoiDung { get; set; }
        public int NguoiGui { get; set; }
        public string NguoiNhan { get; set; }
        public string SDT { get; set; }
        public string DiaChiNhan { get; set; }
        public DateTime NgayGui { get; set; }
        public string NguoiNhanThucTe { get; set; }
        public DateTime NgayNhanThucTe { get; set; }
        public string HinhAnh { get; set; }
        public int NguoiTao { get; set; }
        public string UserId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateBillByIdDac(ContextDto context) : base(context.dbQLKDConnection)
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
                p.Add("BillId", BillId, DbType.Int32);
                p.Add("SoBill", SoBill, DbType.String);
                p.Add("NoiDung", NoiDung, DbType.String);
                p.Add("NguoiGui", NguoiGui, DbType.Int32);
                p.Add("NguoiNhan", NguoiNhan, DbType.String);
                p.Add("SDT", SDT, DbType.String);
                p.Add("DiaChiNhan", DiaChiNhan, DbType.String);
                p.Add("NgayGui", NgayGui, DbType.DateTime);
                p.Add("NguoiNhanThucTe", NguoiNhanThucTe, DbType.String);
                p.Add("NgayNhanThucTe", NgayNhanThucTe, DbType.DateTime);
                p.Add("HinhAnh", HinhAnh, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.Int32);
                p.Add("UserId", UserId, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_KD_Bill_UpdateBillById",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
