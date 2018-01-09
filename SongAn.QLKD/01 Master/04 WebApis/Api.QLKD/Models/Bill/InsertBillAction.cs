using SongAn.QLKD.Biz.QLKD.Bill;
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

namespace SongAn.QLKD.Api.QLKD.Models.Bill
{
    public class InsertBillAction
    {
        public string phieuBill { get; set; }
        public string userId { get; set; }

        #region private
        private Entity.QLKD.Entity.KDBill _phieuBill;

        private string _UserId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHeader = new InsertBillBiz(context);

                bizHeader.SoBill = Protector.String(_phieuBill.SoBill);
                bizHeader.NoiDung = Protector.String(_phieuBill.NoiDung);
                bizHeader.NguoiGui = Protector.Int(_phieuBill.NguoiGui);
                bizHeader.NguoiNhan = Protector.String(_phieuBill.NguoiNhan);
                bizHeader.SDT = Protector.String(_phieuBill.SDT);
                bizHeader.DiaChiNhan = Protector.String(_phieuBill.DiaChiNhan);
                bizHeader.NgayGui = Protector.DateTime(_phieuBill.NgayGui);
                bizHeader.NguoiNhanThucTe = Protector.String(_phieuBill.NguoiNhanThucTe);
                bizHeader.NgayNhanThucTe = Protector.DateTime(_phieuBill.NgayNhanThucTe);
                bizHeader.HinhAnh = Protector.String(_phieuBill.HinhAnh);
                bizHeader.NguoiTao = Protector.Int(_phieuBill.NguoiTao);
                bizHeader.UserId = _UserId;

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
            var __phieuBill = JsonConvert.DeserializeObject<dynamic>(phieuBill);
            __phieuBill.NgayGui = DateTime.ParseExact(__phieuBill.NgayGui.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __phieuBill.NgayNhanThucTe = DateTime.ParseExact(__phieuBill.NgayNhanThucTe.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuBill = JsonConvert.SerializeObject(__phieuBill);
            _phieuBill = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDBill>(phieuBill);

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
