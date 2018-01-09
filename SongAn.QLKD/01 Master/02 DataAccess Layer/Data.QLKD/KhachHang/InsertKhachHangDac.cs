using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.QLKD.KhachHang
{
    public class InsertKhachHangDac : BaseRepositoryAsync
    {
        #region public properties

        public string MaKhachHang { get; set; }
        public int NhomKhachHangId { get; set; }
        public string TenKhachHang { get; set; }
        public DateTime? NgaySinh { get; set; }
        public int GioiTinh { get; set; }
        public string HinhAnh { get; set; }
        public string SoNha { get; set; }
        public int? TinhThanhPhoId { get; set; }
        public int? QuanHuyenId { get; set; }
        public int? PhuongXaId { get; set; }
        public string DienThoai { get; set; }
        public string FaceBook { get; set; }
        public string Email { get; set; }
        public string NgheNghiep { get; set; }
        public string CoQuan { get; set; }
        public string MaSoThue { get; set; }
        public string EmailCoQuan { get; set; }
        public string Fax { get; set; }
        public string DiaChiCoQuan { get; set; }
        public DateTime? NgayThanhLap { get; set; }
        public string TheoDoi { get; set; }
        public string Khac { get; set; }
        public string NguoiPhuTrach { get; set; }
        public string CachLamViec { get; set; }
        public string TinhCach { get; set; }
        public string SoThich { get; set; }
        public string ThoiQuen { get; set; }
        public string GhiChu { get; set; }
        public string NguoiTao { get; set; }
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
        public InsertKhachHangDac(ContextDto context) : base(context.dbQLKDConnection)
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
                p.Add("MaKhachHang", MaKhachHang, DbType.String);
                p.Add("NhomKhachHangId", NhomKhachHangId, DbType.Int32);
                p.Add("TenKhachHang", TenKhachHang, DbType.String);
                p.Add("NgaySinh", NgaySinh, DbType.DateTime);
                p.Add("GioiTinh", GioiTinh, DbType.Int32);
                p.Add("HinhAnh", HinhAnh, DbType.String);
                p.Add("SoNha", SoNha, DbType.String);
                p.Add("TinhThanhPhoId", TinhThanhPhoId, DbType.Int32);
                p.Add("QuanHuyenId", QuanHuyenId, DbType.Int32);
                p.Add("PhuongXaId", PhuongXaId, DbType.Int32);
                p.Add("DienThoai", DienThoai, DbType.String);
                p.Add("FaceBook", FaceBook, DbType.String);
                p.Add("Email", Email, DbType.String);
                p.Add("NgheNghiep", NgheNghiep, DbType.String);
                p.Add("CoQuan", CoQuan, DbType.String);
                p.Add("MaSoThue", MaSoThue, DbType.String);
                p.Add("EmailCoQuan", EmailCoQuan, DbType.String);
                p.Add("Fax", Fax, DbType.String);
                p.Add("DiaChiCoQuan", DiaChiCoQuan, DbType.String);
                p.Add("NgayThanhLap", NgayThanhLap, DbType.DateTime);
                p.Add("TheoDoi", TheoDoi, DbType.String);
                p.Add("Khac", Khac, DbType.String);
                p.Add("NguoiPhuTrach", NguoiPhuTrach, DbType.String);
                p.Add("CachLamViec", CachLamViec, DbType.String);
                p.Add("TinhCach", TinhCach, DbType.String);
                p.Add("SoThich", SoThich, DbType.String);
                p.Add("ThoiQuen", ThoiQuen, DbType.String);
                p.Add("GhiChu", GhiChu, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.String);
                p.Add("UserId", UserId, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KD_KhachHang_InsertKhachHang",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
