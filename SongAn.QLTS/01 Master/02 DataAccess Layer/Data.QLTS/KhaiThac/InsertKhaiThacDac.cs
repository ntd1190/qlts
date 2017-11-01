using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.KhaiThac
{
    public class InsertKhaiThacDac : BaseRepositoryAsync
    {
        #region public properties

        public int TaiSanId { get; set; }
        public int PhongBanId { get; set; }
        public int NhanVienIdKT { get; set; }
        public int KhachHangNCCId { get; set; }
        public string SoChungTu { get; set; }
        public decimal SoLuongKhaiThac { get; set; }
        public decimal DonGiaKhaiThac { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime ThoiGianKetThuc { get; set; }
        public decimal TienThu { get; set; }
        public decimal NopNganSach { get; set; }
        public decimal DonVi { get; set; }
        public string GhiChu { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public int HopDongId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertKhaiThacDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("PhongBanId", PhongBanId, DbType.Int32);
                p.Add("NhanVienIdKT", NhanVienIdKT, DbType.Int32);
                p.Add("KhachHangNCCId", KhachHangNCCId, DbType.Int32);
                p.Add("SoChungTu", SoChungTu, DbType.String);
                p.Add("SoLuongKhaiThac", SoLuongKhaiThac, DbType.Decimal);
                p.Add("DonGiaKhaiThac", DonGiaKhaiThac, DbType.Decimal);
                p.Add("ThoiGianBatDau", ThoiGianBatDau, DbType.DateTime);
                p.Add("ThoiGianKetThuc", ThoiGianKetThuc, DbType.DateTime);
                p.Add("TienThu", TienThu, DbType.Decimal);
                p.Add("NopNganSach", NopNganSach, DbType.Decimal);
                p.Add("DonVi", DonVi, DbType.Decimal);
                p.Add("GhiChu", GhiChu, DbType.String);
                p.Add("CoSoId", CoSoId, DbType.Int32);
                p.Add("NhanVienId", NhanVienId, DbType.Int32);
                p.Add("HopDongId", HopDongId, DbType.Int32);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhaiThac_InsertKhaiThac",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
