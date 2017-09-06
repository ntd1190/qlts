using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuXuat;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat
{
    public class UpdateKhoPhieuXuatSauKhiLuuSoCaiAction
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

            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuXuatChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_PhieuXuat.PhieuXuatId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin phiếu xuất");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateKhoPhieuXuatSauKhiLuuSoCaiBiz(context);
                biz.PHIEU_XUAT_ID = _PhieuXuat.PhieuXuatId;
                biz.KHO_XUAT = Protector.String(_PhieuXuat.KhoXuat);
                biz.NGAY_XUAT = _PhieuXuat.NgayXuat;
                biz.SO_PHIEU = _PhieuXuat.SoPhieu;
                biz.CTRL_VERSION = _PhieuXuat.CtrVersion;
                biz.CHI_TIET = strListChiTiet();
                biz.LOGIN_ID = _LoginId.ToString();
                var result = await biz.Execute();

                if (String.IsNullOrEmpty(biz.MESSAGE))
                {
                    var ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoPhieuXuat", result.FirstOrDefault().PhieuXuatId, "Update", _LoginId);
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
                strChiTiet.Add(String.Join(",", new string[] { item.HangHoaId.ToString(), item.SoLuong.ToString(), item.DonGia.ToString(), item.LoHang.ToString(), item.ThoiGianBaoHanh.ToString() }));
            }
            return String.Join("|", strChiTiet);
        }
        #endregion
    }
}
