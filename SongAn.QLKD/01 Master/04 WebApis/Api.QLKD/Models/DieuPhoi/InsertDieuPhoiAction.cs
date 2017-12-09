using SongAn.QLKD.Biz.QLKD.DieuPhoi;
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

namespace SongAn.QLKD.Api.QLKD.Models.DieuPhoi
{
    public class InsertDieuPhoiAction
    {
        public string phieuDieuPhoi { get; set; }
        public string listChiTiet { get; set; }
        public string userId { get; set; }

        #region private
        private Entity.QLKD.Entity.KDDieuPhoi _phieuDieuPhoi;
        private List<Entity.QLKD.Entity.KDDieuPhoiChiTiet> _listChiTiet;
        private DataTable MyTable_DieuPhoiChiTiet;

        private string _UserId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHeader = new InsertDieuPhoiBiz(context);

                bizHeader.DonHangId = Protector.Int(_phieuDieuPhoi.DonHangId);
                bizHeader.NgayDieuPhoi = Protector.DateTime(_phieuDieuPhoi.NgayDieuPhoi);
                bizHeader.NhanVienDieuPhoi = Protector.Int(_phieuDieuPhoi.NhanVienDieuPhoi);
                bizHeader.NguoiTao = Protector.Int(_phieuDieuPhoi.NguoiTao);
                bizHeader.UserId = _UserId;
                bizHeader.MyTable_DieuPhoiChiTiet = MyTable_DieuPhoiChiTiet;

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
            var __phieuDieuPhoi = JsonConvert.DeserializeObject<dynamic>(phieuDieuPhoi);

            __phieuDieuPhoi.NgayDieuPhoi = DateTime.ParseExact(__phieuDieuPhoi.NgayDieuPhoi.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuDieuPhoi = JsonConvert.SerializeObject(__phieuDieuPhoi);
            _phieuDieuPhoi = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDDieuPhoi>(phieuDieuPhoi);

            //////////////////////////////////////////////////////////////////////////

            var __phieuDieuPhoiChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuDieuPhoiChiTiet)
            {
                if (item.NgayNhan == "" || item.NgayNhan == null)
                {
                    item.NgayNhan = null;
                }
                else
                {
                    item.NgayNhan = DateTime.ParseExact(item.NgayNhan.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                }
            }

            listChiTiet = JsonConvert.SerializeObject(__phieuDieuPhoiChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.KDDieuPhoiChiTiet>>(listChiTiet);
            MyTable_DieuPhoiChiTiet = new DataTable();
            MyTable_DieuPhoiChiTiet.Columns.Add("DieuPhoiId", typeof(int));
            MyTable_DieuPhoiChiTiet.Columns.Add("HangHoaId", typeof(int));
            MyTable_DieuPhoiChiTiet.Columns.Add("NhanVienId", typeof(int));
            MyTable_DieuPhoiChiTiet.Columns.Add("KhachHangId", typeof(int));
            MyTable_DieuPhoiChiTiet.Columns.Add("DaChuyen", typeof(int));
            MyTable_DieuPhoiChiTiet.Columns.Add("NguoiChuyen", typeof(string));
            MyTable_DieuPhoiChiTiet.Columns.Add("DiaChiGui", typeof(string));
            MyTable_DieuPhoiChiTiet.Columns.Add("DiaChiNhan", typeof(string));
            MyTable_DieuPhoiChiTiet.Columns.Add("NguoiNhan", typeof(string));
            MyTable_DieuPhoiChiTiet.Columns.Add("NgayNhan", typeof(DateTime));
            MyTable_DieuPhoiChiTiet.Columns.Add("TrangThai", typeof(int));
            foreach (var item in _listChiTiet)
            {
                MyTable_DieuPhoiChiTiet.Rows.Add(Protector.Int(item.DieuPhoiId),
                                                Protector.Int(item.HangHoaId),
                                                Protector.Int(item.NhanVienId),
                                                Protector.Int(item.KhachHangId),
                                                Protector.Int(item.DaChuyen),
                                                Protector.String(item.NguoiChuyen),
                                                Protector.String(item.DiaChiGui),
                                                Protector.String(item.DiaChiNhan),
                                                Protector.String(item.NguoiNhan),
                                                item.NgayNhan,
                                                Protector.Int(item.TrangThai));
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
