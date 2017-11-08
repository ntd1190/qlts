
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Biz.QLKD.NhanVien
{
    /// <summary>
    /// Biz Lấy danh sách chúc vụ theo điều kiện
    /// </summary>
    /// <remarks>
    /// Luu y: 
    /// -   Vi trong truong hop nay tang biz chi goi 1 dac nen ke
    ///     thua lai tang dac va goi lai ham execute cua tang dac
    ///     
    /// -   Neu biz co xu ly phuc tap, ket hop nhieu dac thi se 
    ///     khoi tao nhieu dac trong ham execute cua biz.
    /// </remarks>
    public class UpdateThongTinNhanVienBiz : Entity.QLKD.Entity.NhanVien
    {
        #region public properties
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateThongTinNhanVienBiz(ContextDto context)
        {
            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init() { }

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
        public async Task<Entity.QLKD.Entity.NhanVien> Execute()
        {
            Init();
            Validate();

            var repo = new NhanVienRepository(_context);
            var result = await repo.UpdatePartial(this
                , nameof(Ma)
                , nameof(Ho)
                , nameof(Ten)
                , nameof(PhongBanId)
                , nameof(ChucVuId)
                , nameof(NgaySinh)
                , nameof(CMND)
                , nameof(NgayCap)
                , nameof(NoiCap)
                , nameof(ThuongTru)
                , nameof(TamTru)
                , nameof(NgayTuyenDung)
                , nameof(ChiNhanhId)
                , nameof(DienThoai)
                , nameof(DiDong)
                , nameof(Email)
                , nameof(MaTrangThai)
                , nameof(GhiChu)
                );

            return result;
        }

        #endregion
        #region helper
        #endregion
    }
}
