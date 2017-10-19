using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhoPhieuNhap;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using System.Data;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.KhoPhieuNhap
{
    public class UpdateKhoPhieuNhapByIdAction
    {
        public string khoPhieuNhapId { get; set; }
        public string phieuKhoPhieuNhap { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.KhoPhieuNhap _phieuKhoPhieuNhap;
        private List<Entity.QLTS.Entity.KhoPhieuNhapChiTiet> _listChiTiet;
        private DataTable MyTable_KhoPhieuNhapChiTiet;
        private int _LoginId;
        private int _khoPhieuNhapId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_khoPhieuNhapId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy _khoPhieuNhapId");
                }

                var bizHeader = new UpdateKhoPhieuNhapByIdBiz(context);


                bizHeader.KhoPhieuNhapId = _khoPhieuNhapId;
                bizHeader.KhoTaiSanId = _phieuKhoPhieuNhap.KhoTaiSanId;
                bizHeader.NguonNganSachId = _phieuKhoPhieuNhap.NguonNganSachId;
                bizHeader.NhaCungCapId = _phieuKhoPhieuNhap.NhaCungCapId;
                bizHeader.NgayNhap = _phieuKhoPhieuNhap.NgayNhap;
                bizHeader.SoPhieu = _phieuKhoPhieuNhap.SoPhieu;
                bizHeader.Seri = _phieuKhoPhieuNhap.Seri;
                bizHeader.SoHoaDon = _phieuKhoPhieuNhap.SoHoaDon;
                bizHeader.NgayHD = _phieuKhoPhieuNhap.NgayHD;
                bizHeader.BBKiem = _phieuKhoPhieuNhap.BBKiem;
                bizHeader.ChietKhau = _phieuKhoPhieuNhap.ChietKhau;
                bizHeader.NguoiGiao = _phieuKhoPhieuNhap.NguoiGiao;
                bizHeader.Loai = _phieuKhoPhieuNhap.Loai;
                bizHeader.TaiKhoanNo = _phieuKhoPhieuNhap.TaiKhoanNo;
                bizHeader.TaiKhoanCo = _phieuKhoPhieuNhap.TaiKhoanCo;
                bizHeader.NoiDung = _phieuKhoPhieuNhap.NoiDung;
                bizHeader.CoSoId = _phieuKhoPhieuNhap.CoSoId;
                bizHeader.NguoiTao = _phieuKhoPhieuNhap.NguoiTao;
                bizHeader.MyTable_KhoPhieuNhapChiTiet = MyTable_KhoPhieuNhapChiTiet;

                var result = await bizHeader.Execute();


                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            var __phieuKhoPhieuNhap = JsonConvert.DeserializeObject<dynamic>(phieuKhoPhieuNhap);
            __phieuKhoPhieuNhap.NgayNhap = DateTime.ParseExact(__phieuKhoPhieuNhap.NgayNhap.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __phieuKhoPhieuNhap.NgayHD = DateTime.ParseExact(__phieuKhoPhieuNhap.NgayHD.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuKhoPhieuNhap = JsonConvert.SerializeObject(__phieuKhoPhieuNhap);
            _phieuKhoPhieuNhap = JsonConvert.DeserializeObject<Entity.QLTS.Entity.KhoPhieuNhap>(phieuKhoPhieuNhap);

            //////////////////////////////////////////////////////////////////////////

            var __phieuKhoPhieuNhapChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);
            listChiTiet = JsonConvert.SerializeObject(__phieuKhoPhieuNhapChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.KhoPhieuNhapChiTiet>>(listChiTiet);
            MyTable_KhoPhieuNhapChiTiet = new DataTable();
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("KhoPhieuNhapId", typeof(int));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("TaiSanId", typeof(int));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("SoLuong", typeof(decimal));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("DonGia", typeof(decimal));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("GiaMua", typeof(decimal));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("GiaBan", typeof(decimal));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("VAT", typeof(decimal));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("HangDung", typeof(string));
            MyTable_KhoPhieuNhapChiTiet.Columns.Add("LoSanXuat", typeof(string));
            foreach (var item in _listChiTiet)
            {
                MyTable_KhoPhieuNhapChiTiet.Rows.Add(item.KhoPhieuNhapId, item.TaiSanId, item.SoLuong, item.DonGia, item.GiaMua, item.GiaBan, item.VAT, item.HangDung, item.LoSanXuat);
            }

            //////////////////////////////////////////////////////////////////////////
            _LoginId = Protector.Int(loginId, 0);
            _khoPhieuNhapId = Protector.Int(khoPhieuNhapId, 0);

        }

        private void validate()
        {

        }

        #region helpers
        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
        #endregion
    }
}
