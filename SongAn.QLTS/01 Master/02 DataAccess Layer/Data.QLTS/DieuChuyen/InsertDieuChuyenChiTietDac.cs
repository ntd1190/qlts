using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLNS.DieuChuyen
{
    public class InsertDieuChuyenChiTietDac : BaseRepositoryAsync
    {
        #region public properties

        public int DieuChuyenId { get; set; }
        public int TaiSanId { get; set; }
        public int PhongBanSuDung { get; set; }
        public int PhongBanChuyenDen { get; set; }
        public decimal SoLuong { get; set; }
        public string LyDo { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertDieuChuyenChiTietDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("DieuChuyenId", DieuChuyenId, DbType.Int32);
                p.Add("TaiSanId", TaiSanId, DbType.Int32);
                p.Add("PhongBanSuDung", PhongBanSuDung, DbType.Int32);
                p.Add("PhongBanChuyenDen", PhongBanChuyenDen, DbType.Int32);
                p.Add("SoLuong", SoLuong, DbType.Decimal);
                p.Add("LyDo", LyDo, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_DieuChuyenChiTiet_InsertDieuChuyenChiTiet",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
