/*****************************************************************************
1. Create Date : 2017.05.15
2. Creator     : Nguyen Thanh Binh
3. Description : thêm nhân viên mới
4. History     : 2017.05.15(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.NhanVien;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLDN.Api.QLNS.Models.NhanVien
{
    public class InsertThongTinNhanVienAction
    {
        #region public
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

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new InsertThongTinNhanVienBiz(context);
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

                var obj = await biz.Execute();

                if (obj.NhanVienId == 0)
                {
                    throw new BaseException("Không thể thêm nhân viên.");
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, obj, null);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
    }
}