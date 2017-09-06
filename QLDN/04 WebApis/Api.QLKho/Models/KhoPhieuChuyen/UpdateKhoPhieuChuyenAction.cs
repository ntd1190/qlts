using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using Newtonsoft.Json;
using System.Collections.Generic;
using SongAn.QLDN.Biz.QLKho.KhoPhieuChuyen;
using System.Linq;
using SongAn.QLDN.Util.Common.CustomException;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuChuyen
{
    public class UpdateKhoPhieuChuyenAction : Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChuyen
    {

        #region PUBLIC
        public string PhieuChuyen { get; set; }
        public string listChiTiet { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChuyen _PhieuChuyen;
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChuyenChiTiet> _listChiTiet;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            PhieuChuyen = Protector.String(PhieuChuyen, "{}");
            var __PhieuChuyen = JsonConvert.DeserializeObject<dynamic>(PhieuChuyen);
            __PhieuChuyen.NgayXuat = Protector.String(__PhieuChuyen.NgayXuat, "");
            __PhieuChuyen.NgayNhap = Protector.String(__PhieuChuyen.NgayNhap, "");

            __PhieuChuyen.NgayXuat = Protector.DateTime(__PhieuChuyen.NgayXuat, "dd/MM/yyyy", true);
            __PhieuChuyen.NgayNhap = Protector.DateTime(__PhieuChuyen.NgayNhap, "dd/MM/yyyy", true);

            PhieuChuyen = JsonConvert.SerializeObject(__PhieuChuyen);
            _PhieuChuyen = JsonConvert.DeserializeObject<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChuyen>(PhieuChuyen);

            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChuyenChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(LoginId, 0);
        }
        private void validate() { }
        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                _PhieuChuyen.NguoiTao = _LoginId;

                var biz = new UpdateKhoPhieuChuyenBiz(context);
                biz.PhieuChuyenId = _PhieuChuyen.PhieuChuyenId;
                biz.SoPhieu = _PhieuChuyen.SoPhieu;
                biz.NoiDung = _PhieuChuyen.NoiDung;
                biz.TaiKhoanNhap = _PhieuChuyen.TaiKhoanNhap;
                biz.TaiKhoanXuat = _PhieuChuyen.TaiKhoanXuat;
                biz.NgayXuat = _PhieuChuyen.NgayXuat;
                biz.NgayNhap = _PhieuChuyen.NgayNhap;
                biz.KhoNhap = _PhieuChuyen.KhoNhap;
                biz.KhoXuat = _PhieuChuyen.KhoXuat;
                biz.NguoiGiaoHang = _PhieuChuyen.NguoiGiaoHang;
                biz.NguoiNhanHang = _PhieuChuyen.NguoiNhanHang;
                biz.GhiChu = _PhieuChuyen.GhiChu;
                biz.Hinh = _PhieuChuyen.Hinh;
                biz.MaTrangThai = _PhieuChuyen.MaTrangThai;
                biz.ChiPhi = _PhieuChuyen.ChiPhi;
                biz.ThueVAT = _PhieuChuyen.ThueVAT;
                biz.NguoiTao = _PhieuChuyen.NguoiTao;
                biz.NgayTao = _PhieuChuyen.NgayTao;
                biz.XoaYN = _PhieuChuyen.XoaYN;
                biz.CtrVersion = _PhieuChuyen.CtrVersion;

                biz.CHI_TIET = strListChiTiet();
                biz.LOGIN_ID = _LoginId;
                var result = await biz.Execute();

                if (String.IsNullOrEmpty(biz.MESSAGE))
                {
                    var ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoPhieuChuyen", result.FirstOrDefault().PhieuChuyenId, "Update", _LoginId);
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
                    string.Empty
                }));
            }
            return String.Join("|", strChiTiet);
        }
        #endregion
    }
}
