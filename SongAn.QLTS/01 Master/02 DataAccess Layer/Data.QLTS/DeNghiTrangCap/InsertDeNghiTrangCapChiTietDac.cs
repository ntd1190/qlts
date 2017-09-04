using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLNS.DeNghiTrangCap
{
    public class InsertDeNghiTrangCapChiTietDac : BaseRepositoryAsync
    {
        #region public properties

        public int DeNghiId { get; set; }
        public string TenTaiSan { get; set; }
        public string Mota { get; set; }
        public int LoaiId { get; set; }
        public decimal SoLuong { get; set; }
        public string DonViTinh { get; set; }
        public int PhuongThucId { get; set; }
        public DateTime NgayDeNghi { get; set; }
        public decimal DuToan { get; set; }
        public decimal DuToanDuocDuyet { get; set; }
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
        public InsertDeNghiTrangCapChiTietDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("DeNghiId", DeNghiId, DbType.Int32);
                p.Add("TenTaiSan", TenTaiSan, DbType.String);
                p.Add("MoTa", Mota, DbType.String);
                p.Add("LoaiId", LoaiId, DbType.Int32);
                p.Add("SoLuong", SoLuong, DbType.Decimal);
                p.Add("DonViTinh", DonViTinh, DbType.String);
                p.Add("PhuongThucId", PhuongThucId, DbType.Int32);
                p.Add("NgayDeNghi", NgayDeNghi, DbType.DateTime);
                p.Add("DuToan", DuToan, DbType.Decimal);
                p.Add("DuToanDuocDuyet", DuToanDuocDuyet, DbType.Decimal);
                p.Add("GhiChu", GhiChu, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_DeNghiTrangCapChiTiet_InsertDeNghiTrangCapChiTiet",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
