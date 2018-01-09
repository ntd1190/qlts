using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.QLKD.DonHang
{
    public class UpdateDonHangByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int DonHangId { get; set; }
        public string SoPhieu { get; set; }
        public string TenDonHang { get; set; }
        public DateTime NgayLap { get; set; }
        public int KhachHangId { get; set; }
        public string LyDo { get; set; }
        public int HopDongId { get; set; }
        public int NhanVienId { get; set; }
        public string DiaChiNhan { get; set; }
        public string BoPhanNhan { get; set; }
        public string NguoiNhan { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
        public DateTime? NgayDuyet { get; set; }
        public int NguoiTao { get; set; }
        public string UserId { get; set; }
        public DataTable MyTable_DonHangChiTiet { get; set; }

        #endregion

        #region private variable

        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateDonHangByIdDac(ContextDto context) : base(context.dbQLKDConnection)
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
                p.Add("DonHangId", DonHangId, DbType.Int32);
                p.Add("SoPhieu", SoPhieu, DbType.String);
                p.Add("TenDonHang", TenDonHang, DbType.String);
                p.Add("NgayLap", NgayLap, DbType.DateTime);
                p.Add("KhachHangId", KhachHangId, DbType.Int32);
                p.Add("LyDo", LyDo, DbType.String);
                p.Add("HopDongId", HopDongId, DbType.Int32);
                p.Add("NhanVienId", NhanVienId, DbType.Int32);
                p.Add("DiaChiNhan", DiaChiNhan, DbType.String);
                p.Add("BoPhanNhan", BoPhanNhan, DbType.String);
                p.Add("NguoiNhan", NguoiNhan, DbType.String);
                p.Add("GhiChu", GhiChu, DbType.String);
                p.Add("TrangThai", TrangThai, DbType.Int32);
                p.Add("NgayDuyet", NgayDuyet, DbType.DateTime);
                p.Add("NguoiTao", NguoiTao, DbType.Int32);
                p.Add("UserId", UserId, DbType.String);
                p.Add("@MyTableType_DonHangChiTiet", MyTable_DonHangChiTiet.AsTableValuedParameter());

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_KD_DonHang_UpdateDonHangById",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
