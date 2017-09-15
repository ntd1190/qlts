using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.BienBanKiemKe;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;
using System.Data;

namespace SongAn.QLTS.Api.QLTS.Models.BienBanKiemKe
{
    public class InsertBienBanKiemKeAction
    {
        public string phieuKiemKe { get; set; }
        public string listChiTiet { get; set; }
        public string listBanKiemKe { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.BienBanKiemKe _phieuKiemKe;
        private List<Entity.QLTS.Entity.BienBanKiemKeChiTiet> _listChiTiet;
        private DataTable MyTable_KiemKiemChiTiet;
        private List<Entity.QLTS.Entity.BanKiemKe> _listBanKiemKe;
        private DataTable MyTable_BanKiemKe;
        private int _LoginId;        
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHeader = new InsertBienBanKiemKeBiz(context);

                bizHeader.SoChungTu = _phieuKiemKe.SoChungTu;
                bizHeader.NgayChungTu = _phieuKiemKe.NgayChungTu;
                bizHeader.NgayKiemKe = _phieuKiemKe.NgayKiemKe;
                bizHeader.PhongBanId = Protector.Int(_phieuKiemKe.PhongBanId);
                bizHeader.GhiChu = _phieuKiemKe.GhiChu;
                bizHeader.CoSoId = _phieuKiemKe.CoSoId;
                bizHeader.NhanVienId = _LoginId;
                bizHeader.MyTable_BienBanKiemKeChiTiet = MyTable_KiemKiemChiTiet;
                bizHeader.MyTable_BanKiemKe = MyTable_BanKiemKe;

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
            var __phieuKiemKe = JsonConvert.DeserializeObject<dynamic>(phieuKiemKe);
            __phieuKiemKe.NgayChungTu = DateTime.ParseExact(__phieuKiemKe.NgayChungTu.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __phieuKiemKe.NgayKiemKe = DateTime.ParseExact(__phieuKiemKe.NgayKiemKe.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuKiemKe = JsonConvert.SerializeObject(__phieuKiemKe);
            _phieuKiemKe = JsonConvert.DeserializeObject<Entity.QLTS.Entity.BienBanKiemKe>(phieuKiemKe);

            //////////////////////////////////////////////////////////////////////////

            var __phieuKiemKeChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);
            listChiTiet = JsonConvert.SerializeObject(__phieuKiemKeChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.BienBanKiemKeChiTiet>>(listChiTiet);
            MyTable_KiemKiemChiTiet = new DataTable();
            MyTable_KiemKiemChiTiet.Columns.Add("BienBanKiemKeId", typeof(int));
            MyTable_KiemKiemChiTiet.Columns.Add("TaiSanId", typeof(int));
            MyTable_KiemKiemChiTiet.Columns.Add("SoLuong", typeof(decimal));
            foreach (var item in _listChiTiet)
            {
                MyTable_KiemKiemChiTiet.Rows.Add(item.BienBanKiemKeId, item.TaiSanId, item.SoLuong);
            }

            //////////////////////////////////////////////////////////////////////////

            _listBanKiemKe = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.BanKiemKe>>(listBanKiemKe);
            MyTable_BanKiemKe = new DataTable();
            MyTable_BanKiemKe.Columns.Add("BienBanKiemKeId", typeof(int));
            MyTable_BanKiemKe.Columns.Add("NguoiKiemKe", typeof(string));
            MyTable_BanKiemKe.Columns.Add("ChucVu", typeof(string));
            MyTable_BanKiemKe.Columns.Add("DaiDien", typeof(string));
            MyTable_BanKiemKe.Columns.Add("VaiTro", typeof(string));
            foreach (var item in _listBanKiemKe)
            {
                MyTable_BanKiemKe.Rows.Add(item.BienBanKiemKeId, item.NguoiKiemKe, item.ChucVu, item.DaiDien, item.VaiTro);
            }

            //////////////////////////////////////////////////////////////////////////
            _LoginId = Protector.Int(loginId, 0);

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
