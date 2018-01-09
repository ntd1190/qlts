using Newtonsoft.Json;
using SongAn.QLKD.Biz.QLKD.DonHang;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.DonHang
{
    public class UpdateDonHangByIdAction
    {
        public string donHangId { get; set; }
        public string phieuDonHang { get; set; }
        public string listChiTiet { get; set; }
        public string userId { get; set; }

        #region private
        private Entity.QLKD.Entity.KDDonHang _phieuDonHang;
        private List<Entity.QLKD.Entity.KDDonHangChiTiet> _listChiTiet;
        private DataTable MyTable_DonHangChiTiet;

        private string _UserId;
        private int _donHangId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_donHangId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy _donHangId");
                }

                var bizHeader = new UpdateDonHangByIdBiz(context);

                bizHeader.DonHangId = Protector.Int(_donHangId);
                bizHeader.SoPhieu = Protector.String(_phieuDonHang.SoPhieu);
                bizHeader.TenDonHang = Protector.String(_phieuDonHang.TenDonHang);
                bizHeader.NgayLap = Protector.DateTime(_phieuDonHang.NgayLap);
                bizHeader.KhachHangId = Protector.Int(_phieuDonHang.KhachHangId);
                bizHeader.LyDo = Protector.String(_phieuDonHang.LyDo);
                bizHeader.HopDongId = Protector.Int(_phieuDonHang.HopDongId);
                bizHeader.NhanVienId = Protector.Int(_phieuDonHang.NhanVienId);
                bizHeader.DiaChiNhan = Protector.String(_phieuDonHang.DiaChiNhan);
                bizHeader.BoPhanNhan = Protector.String(_phieuDonHang.BoPhanNhan);
                bizHeader.NguoiNhan = Protector.String(_phieuDonHang.NguoiNhan);
                bizHeader.GhiChu = Protector.String(_phieuDonHang.GhiChu);
                bizHeader.TrangThai = Protector.Int(_phieuDonHang.TrangThai);
                bizHeader.NgayDuyet = _phieuDonHang.NgayDuyet;
                bizHeader.NguoiTao = Protector.Int(_phieuDonHang.NguoiTao);
                bizHeader.UserId = _UserId;
                bizHeader.MyTable_DonHangChiTiet = MyTable_DonHangChiTiet;

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
            var __phieuDonHang = JsonConvert.DeserializeObject<dynamic>(phieuDonHang);
            __phieuDonHang.NgayLap = DateTime.ParseExact(__phieuDonHang.NgayLap.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            if (__phieuDonHang.NgayDuyet == "" || __phieuDonHang.NgayDuyet == null)
            {
                __phieuDonHang.NgayDuyet = null;
            }
            else
            {
                __phieuDonHang.NgayDuyet = DateTime.ParseExact(__phieuDonHang.NgayDuyet.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            }
            phieuDonHang = JsonConvert.SerializeObject(__phieuDonHang);
            _phieuDonHang = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDDonHang>(phieuDonHang);

            //////////////////////////////////////////////////////////////////////////

            var __phieuDonHangChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuDonHangChiTiet)
            {
                item.NgayYeuCau = DateTime.ParseExact(item.NgayYeuCau.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                item.NgayNhanHang = DateTime.ParseExact(item.NgayNhanHang.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            }

            listChiTiet = JsonConvert.SerializeObject(__phieuDonHangChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.KDDonHangChiTiet>>(listChiTiet);
            MyTable_DonHangChiTiet = new DataTable();
            MyTable_DonHangChiTiet.Columns.Add("DonHangId", typeof(int));
            MyTable_DonHangChiTiet.Columns.Add("HangHoaId", typeof(int));
            MyTable_DonHangChiTiet.Columns.Add("SoLuong", typeof(decimal));
            MyTable_DonHangChiTiet.Columns.Add("DonGia", typeof(decimal));
            MyTable_DonHangChiTiet.Columns.Add("NgayYeuCau", typeof(DateTime));
            MyTable_DonHangChiTiet.Columns.Add("NgayNhanHang", typeof(DateTime));
            foreach (var item in _listChiTiet)
            {
                MyTable_DonHangChiTiet.Rows.Add(Protector.Int(item.DonHangId), Protector.Int(item.HangHoaId), Protector.Decimal(item.SoLuong), Protector.Decimal(item.DonGia), Protector.DateTime(item.NgayYeuCau), Protector.DateTime(item.NgayNhanHang));
            }


            //////////////////////////////////////////////////////////////////////////
            _UserId = Protector.String(userId);
            _donHangId = Protector.Int(donHangId, 0);
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
