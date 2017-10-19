using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.KhoPhieuNhap
{
    public class UpdateKhoPhieuNhapByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int KhoPhieuNhapId { get; set; }
        public int KhoTaiSanId { get; set; }
        public int NguonNganSachId { get; set; }
        public int NhaCungCapId { get; set; }
        public DateTime NgayNhap { get; set; }
        public string SoPhieu { get; set; }
        public string Seri { get; set; }
        public string SoHoaDon { get; set; }
        public DateTime NgayHD { get; set; }
        public string BBKiem { get; set; }
        public int ChietKhau { get; set; }
        public string NguoiGiao { get; set; }
        public string Loai { get; set; }
        public string TaiKhoanNo { get; set; }
        public string TaiKhoanCo { get; set; }
        public string NoiDung { get; set; }
        public int CoSoId { get; set; }
        public int NguoiTao { get; set; }
        public DataTable MyTable_KhoPhieuNhapChiTiet { get; set; }

        #endregion

        #region private variable

        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateKhoPhieuNhapByIdDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("KhoPhieuNhapId", KhoPhieuNhapId, DbType.Int32);
                p.Add("KhoTaiSanId", KhoTaiSanId, DbType.Int32);
                p.Add("NguonNganSachId", NguonNganSachId, DbType.Int32);
                p.Add("NhaCungCapId", NhaCungCapId, DbType.Int32);
                p.Add("NgayNhap", NgayNhap, DbType.DateTime);
                p.Add("SoPhieu", SoPhieu, DbType.String);
                p.Add("Seri", Seri, DbType.String);
                p.Add("SoHoaDon", SoHoaDon, DbType.String);
                p.Add("NgayHD", NgayHD, DbType.DateTime);
                p.Add("BBKiem", BBKiem, DbType.String);
                p.Add("ChietKhau", ChietKhau, DbType.Int32);
                p.Add("NguoiGiao", NguoiGiao, DbType.String);
                p.Add("Loai", Loai, DbType.String);
                p.Add("TaiKhoanNo", TaiKhoanNo, DbType.String);
                p.Add("TaiKhoanCo", TaiKhoanCo, DbType.String);
                p.Add("NoiDung", NoiDung, DbType.String);
                p.Add("CoSoId", CoSoId, DbType.Int32);
                p.Add("NguoiTao", NguoiTao, DbType.Int32);
                p.Add("@MyTable_KhoPhieuNhapChiTiet", MyTable_KhoPhieuNhapChiTiet.AsTableValuedParameter());

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_KhoPhieuNhap_UpdateKhoPhieuNhapById",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
