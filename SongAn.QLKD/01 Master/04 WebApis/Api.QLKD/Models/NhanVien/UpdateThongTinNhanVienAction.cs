
using SongAn.QLKD.Biz.QLKD.NhanVien;
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class UpdateThongTinNhanVienAction
    {
        #region public
        public string NhanVienId { get; set; }
        public string CtrVersion { get; set; }
        public string Ma { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public string PhongBanId { get; set; }
        public string ChucVuId { get; set; }
        public string ChiNhanhId { get; set; }
        public string NgaySinh { get; set; }
        public string CMND { get; set; }
        public string NgayCap { get; set; }
        public string NoiCap { get; set; }
        public string ThuongTru { get; set; }
        public string TamTru { get; set; }
        public string NgayTuyenDung { get; set; }
        public string DienThoai { get; set; }
        public string DiDong { get; set; }
        public string Email { get; set; }
        public string MaTrangThai { get; set; }
        public string GhiChu { get; set; }
        #endregion

        #region private
        private int _NhanVienId;
        private int _CtrVersion;
        private int _PhongBanId;
        private int? _ChucVuId;
        private int? _ChiNhanhId;
        private DateTime? _NgaySinh;
        private DateTime? _NgayCap;
        private DateTime? _NgayTuyenDung;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _NhanVienId = Protector.Int(NhanVienId, 0);
            _CtrVersion = Protector.Int(CtrVersion, 0);
            _PhongBanId = Protector.Int(PhongBanId, 0);

            _ChiNhanhId = Protector.Int(ChiNhanhId, true);
            _ChiNhanhId = _ChiNhanhId == 0 ? null : _ChiNhanhId;

            _ChucVuId = Protector.Int(ChucVuId, true);
            _ChucVuId = _ChucVuId == 0 ? null : _ChucVuId;

            _NgaySinh = Protector.DateTime(NgaySinh, "yyyy-MM-dd", true);
            _NgayCap = Protector.DateTime(NgayCap, "yyyy-MM-dd", true);
            _NgayTuyenDung = Protector.DateTime(NgayTuyenDung, "yyyy-MM-dd", true);

            Ma = Protector.String(Ma, "");
            Ho = Protector.String(Ho, "");
            Ten = Protector.String(Ten, "");
            CMND = Protector.String(CMND, "");
            NoiCap = Protector.String(NoiCap, "");
            ThuongTru = Protector.String(ThuongTru, "");
            TamTru = Protector.String(TamTru, "");
            DienThoai = Protector.String(DienThoai, "");
            DiDong = Protector.String(DiDong, "");
            Email = Protector.String(Email, "");
            MaTrangThai = Protector.String(MaTrangThai, "");
            GhiChu = Protector.String(GhiChu, "");
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_NhanVienId <= 0)
            {
                throw new BaseException("NhanVienId phải lớn hơn 0.");
            }

            if (string.IsNullOrEmpty(Ma))
            {
                throw new BaseException("Chưa nhập mã nhân viên.");
            }
            if (string.IsNullOrEmpty(Ho))
            {
                throw new BaseException("Chưa nhập họ nhân viên.");
            }
            if (string.IsNullOrEmpty(Ten))
            {
                throw new BaseException("Chưa nhập tên nhân viên.");
            }
            if (_PhongBanId <= 0)
            {
                throw new BaseException("Chưa chọn phòng ban cho nhân viên.");
            }

        }

        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateThongTinNhanVienBiz(context);
                biz.CtrVersion = _CtrVersion;
                biz.NhanVienId = _NhanVienId;
                biz.Ma = Ma;
                biz.Ho = Ho;
                biz.Ten = Ten;
                biz.PhongBanId = _PhongBanId;
                biz.ChucVuId = _ChucVuId;
                biz.ChiNhanhId = _ChiNhanhId;
                biz.NgaySinh = _NgaySinh;
                biz.CMND = CMND;
                biz.NgayCap = _NgayCap;
                biz.NoiCap = NoiCap;
                biz.ThuongTru = ThuongTru;
                biz.TamTru = TamTru;
                biz.NgayTuyenDung = _NgayTuyenDung;
                biz.DienThoai = DienThoai;
                biz.DiDong = DiDong;
                biz.Email = Email;
                biz.MaTrangThai = MaTrangThai;
                biz.GhiChu = GhiChu;

                var nhanvien = await biz.Execute();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, nhanvien, null);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}