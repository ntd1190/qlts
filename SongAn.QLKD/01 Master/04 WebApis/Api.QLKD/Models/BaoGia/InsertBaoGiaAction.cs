using SongAn.QLKD.Biz.QLKD.BaoGia;
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
using Newtonsoft.Json;

namespace SongAn.QLKD.Api.QLKD.Models.BaoGia
{
    public class InsertBaoGiaAction
    {
        public string phieuBaoGia { get; set; }
        public string listChiTiet { get; set; }
        public string userId { get; set; }

        #region private
        private Entity.QLKD.Entity.KDBaoGia _phieuBaoGia;
        private List<Entity.QLKD.Entity.KDBaoGiaChiTiet> _listChiTiet;
        private DataTable MyTable_BaoGiaChiTiet;

        private string _UserId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHeader = new InsertBaoGiaBiz(context);

                bizHeader.SoPhieu = Protector.String(_phieuBaoGia.SoPhieu);
                bizHeader.TenBaoGia = Protector.String(_phieuBaoGia.TenBaoGia);
                bizHeader.NgayBaoGia = Protector.DateTime(_phieuBaoGia.NgayBaoGia);
                bizHeader.KhachHangId = Protector.Int(_phieuBaoGia.KhachHangId);
                bizHeader.LyDo = Protector.String(_phieuBaoGia.LyDo);
                bizHeader.NhanVienId = Protector.Int(_phieuBaoGia.NhanVienId);
                bizHeader.NguoiNhan = Protector.String(_phieuBaoGia.NguoiNhan);
                bizHeader.DienThoai = Protector.String(_phieuBaoGia.DienThoai);
                bizHeader.DaNhan = Protector.Int(_phieuBaoGia.DaNhan);
                bizHeader.GhiChu = Protector.String(_phieuBaoGia.GhiChu);
                bizHeader.TrangThai = Protector.Int(_phieuBaoGia.TrangThai);
                bizHeader.NguoiTao = Protector.Int(_phieuBaoGia.NguoiTao);
                bizHeader.UserId = _UserId;
                bizHeader.MyTable_BaoGiaChiTiet = MyTable_BaoGiaChiTiet;

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
            var __phieuBaoGia = JsonConvert.DeserializeObject<dynamic>(phieuBaoGia);
            __phieuBaoGia.NgayBaoGia = DateTime.ParseExact(__phieuBaoGia.NgayBaoGia.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            
            phieuBaoGia = JsonConvert.SerializeObject(__phieuBaoGia);
            _phieuBaoGia = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDBaoGia>(phieuBaoGia);

            //////////////////////////////////////////////////////////////////////////

            var __phieuBaoGiaChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuBaoGiaChiTiet)
            {
                item.NgayBao = DateTime.ParseExact(item.NgayBao.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                item.NgayNhan = DateTime.ParseExact(item.NgayNhan.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            }

            listChiTiet = JsonConvert.SerializeObject(__phieuBaoGiaChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.KDBaoGiaChiTiet>>(listChiTiet);
            MyTable_BaoGiaChiTiet = new DataTable();
            MyTable_BaoGiaChiTiet.Columns.Add("BaoGiaId", typeof(int));
            MyTable_BaoGiaChiTiet.Columns.Add("HangHoaId", typeof(int));
            MyTable_BaoGiaChiTiet.Columns.Add("SoLuong", typeof(decimal));
            MyTable_BaoGiaChiTiet.Columns.Add("DonGia", typeof(decimal));
            MyTable_BaoGiaChiTiet.Columns.Add("NgayBao", typeof(DateTime));
            MyTable_BaoGiaChiTiet.Columns.Add("NgayNhan", typeof(DateTime));
            foreach (var item in _listChiTiet)
            {
                MyTable_BaoGiaChiTiet.Rows.Add(Protector.Int(item.BaoGiaId), Protector.Int(item.HangHoaId), Protector.Decimal(item.SoLuong), Protector.Decimal(item.DonGia), Protector.DateTime(item.NgayBao), Protector.DateTime(item.NgayNhan));
            }


            //////////////////////////////////////////////////////////////////////////
            _UserId = Protector.String(userId);

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
