using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLNS.BaoDuong
{
    public class InsertBaoDuongDac : BaseRepositoryAsync
    {
        #region public properties

        public int TaiSanId { get; set; }
        public DateTime NgayBaoDuong { get; set; }
        public DateTime NgayDuKien { get; set; }
        public decimal DuToan { get; set; }
        public int LoaiBaoDuongId { get; set; }
        public string MoTa { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertBaoDuongDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("TaiSanId", TaiSanId, DbType.Int32);
                p.Add("NgayBaoDuong", NgayBaoDuong, DbType.DateTime);
                p.Add("NgayDuKien", NgayDuKien, DbType.DateTime);
                p.Add("DuToan", DuToan, DbType.Decimal);
                p.Add("LoaiBaoDuongId", LoaiBaoDuongId, DbType.Int32);
                p.Add("MoTa", MoTa, DbType.String);
                p.Add("CoSoId", CoSoId, DbType.Int32);
                p.Add("NhanVienId", NhanVienId, DbType.Int32);

            var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_BaoDuong_InsertBaoDuong",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
