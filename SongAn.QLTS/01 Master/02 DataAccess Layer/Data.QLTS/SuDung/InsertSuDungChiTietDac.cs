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
    public class InsertSuDungChiTietDac : BaseRepositoryAsync
    {
        #region public properties

        public int SuDungId { get; set; }
        public int TaiSanId { get; set; }
        public decimal SoSanPhamPhucVu { get; set; }
        public string DonViTinhSanPham { get; set; }
        public decimal SoNguyenLieuSuDung { get; set; }
        public string DonViTinhNguyenLieu { get; set; }
        public string GhiChu { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertSuDungChiTietDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("SuDungId", SuDungId, DbType.Int32);
                p.Add("TaiSanId", TaiSanId, DbType.Int32);
                p.Add("SoSanPhamPhucVu", SoSanPhamPhucVu, DbType.Decimal);
                p.Add("DonViTinhSanPham", DonViTinhSanPham, DbType.String);
                p.Add("SoNguyenLieuSuDung", SoNguyenLieuSuDung, DbType.Decimal);
                p.Add("DonViTinhNguyenLieu", DonViTinhNguyenLieu, DbType.String);
                p.Add("GhiChu", GhiChu, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_SuDungChiTiet_InsertSuDungChiTiet",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
