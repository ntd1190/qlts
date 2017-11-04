/*****************************************************************************
1. Create Date  : 2017.06.29
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUXUAT/LIST
4. Description  : THÊM THÔNG TIN PHIẾU XUẤT
5. History      : 2017.06.29 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuXuat;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat
{
    public class InsertKhoPhieuXuatAction
    {

        #region PUBLIC
        public string PhieuXuat { get; set; }
        public string listChiTiet { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuXuat _PhieuXuat;
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuXuatChiTiet> _listChiTiet;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            PhieuXuat = Protector.String(PhieuXuat, "{}");
            var __PhieuXuat = JsonConvert.DeserializeObject<dynamic>(PhieuXuat);
            __PhieuXuat.strNgayChungTu = Protector.String(__PhieuXuat.strNgayChungTu, "");
            __PhieuXuat.strNgayThanhToan = Protector.String(__PhieuXuat.strNgayThanhToan, "");
            __PhieuXuat.strNgayXuat = Protector.String(__PhieuXuat.strNgayXuat, "");

            __PhieuXuat.NgayThanhToan = Protector.DateTime(__PhieuXuat.strNgayThanhToan, "yyyy-MM-dd", true);
            __PhieuXuat.NgayXuat = Protector.DateTime(__PhieuXuat.strNgayXuat, "yyyy-MM-dd", true);
            __PhieuXuat.NgayChungTu = Protector.DateTime(__PhieuXuat.strNgayChungTu, "yyyy-MM-dd", true);
            __PhieuXuat.NgayChungTu = __PhieuXuat.NgayChungTu ?? DateTime.Now;

            PhieuXuat = JsonConvert.SerializeObject(__PhieuXuat);
            _PhieuXuat = JsonConvert.DeserializeObject<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuXuat>(PhieuXuat);
            _PhieuXuat.MaTrangThai = "KPX_KN";
            _PhieuXuat.XoaYN = "N";
            _PhieuXuat.CtrVersion = 1;
            _PhieuXuat.NguoiTao = _LoginId;

            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuXuatChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_PhieuXuat.NgayXuat == null)
            {
                throw new BaseException("");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                _PhieuXuat.NguoiTao = _LoginId;

                var biz = new InsertKhoPhieuXuatBiz(context);
                biz.PhieuXuatId = _PhieuXuat.PhieuXuatId;
                biz.ChiPhi = _PhieuXuat.ChiPhi ?? 0;
                biz.LoaiPhieu = _PhieuXuat.LoaiPhieu;
                biz.KhachHangId = _PhieuXuat.KhachHangId;
                biz.DiaChi = _PhieuXuat.DiaChi;
                biz.KhoXuat = _PhieuXuat.KhoXuat;
                biz.NgayChungTu = _PhieuXuat.NgayChungTu;
                biz.NgayThanhToan = _PhieuXuat.NgayThanhToan;
                biz.NgayXuat = _PhieuXuat.NgayXuat;
                biz.NguoiGiaoHang = _PhieuXuat.NguoiGiaoHang;
                biz.NguoiNhanHang = _PhieuXuat.NguoiNhanHang;
                biz.SoDienThoai = _PhieuXuat.SoDienThoai;
                biz.NoiDung = _PhieuXuat.NoiDung;
                biz.Seri = _PhieuXuat.Seri;
                biz.SoHoaDon = _PhieuXuat.SoHoaDon;
                biz.SoPhieu = _PhieuXuat.SoPhieu;
                biz.TaiKhoanCo = _PhieuXuat.TaiKhoanCo;
                biz.TaiKhoanGiaVon = _PhieuXuat.TaiKhoanGiaVon;
                biz.TaiKhoanKho = _PhieuXuat.TaiKhoanKho;
                biz.TaiKhoanNo = _PhieuXuat.TaiKhoanNo;
                biz.ThueVAT = _PhieuXuat.ThueVAT;
                biz.TienThue = _PhieuXuat.TienThue;
                biz.ThuKho = _PhieuXuat.ThuKho;
                biz.Hinh = _PhieuXuat.Hinh;

                biz.CHI_TIET = strListChiTiet();
                biz.LOGIN_ID = _LoginId;
                var result = await biz.Execute();

                if (String.IsNullOrEmpty(biz.MESSAGE))
                {
                    var ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoPhieuXuat", result.FirstOrDefault().PhieuXuatId, "Insert", _LoginId);
                }
                else
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result.FirstOrDefault(), _metaData);
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

        #region HELPERS
        private string strListChiTiet()
        {
            var strChiTiet = new List<string>();
            foreach (var item in _listChiTiet)
            {
                strChiTiet.Add(String.Join(",", new string[] {
                    item.HangHoaId.ToString(),
                    item.SoLuong.ToString(),
                    item.DonGia.ToString(),
                    item.LoHang,
                    item.ThoiGianBaoHanh.ToString(),
                    item.GiaNhap.ToString()
                }));
            }
            return String.Join("|", strChiTiet);
        }
        #endregion
    }
}
