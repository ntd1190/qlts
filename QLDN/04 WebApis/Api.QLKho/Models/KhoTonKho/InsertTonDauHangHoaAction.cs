using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using SongAn.QLDN.Biz.QLKho.KhoTonKho;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTonKho
{
    public class InsertTonDauHangHoaAction
    {
        public int TonKhoId { get; set; }
        public string MaHangHoa { get; set; }
        public string TenHangHoa { get; set; }
        public string DonViTinh { get; set; }
        public string LoHang { get; set; }
        public decimal TonDau { get; set; }
        public decimal GiaNhap { get; set; }
        public string LoginId { get; set; }

        #region private

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new InsertTonDauHangHoaBiz(context);
                biz.TON_KHO_ID = TonKhoId;
                biz.MA_HANG_HOA = MaHangHoa;
                biz.TEN_HANG_HOA = TenHangHoa;
                biz.DON_VI_TINH = DonViTinh;
                biz.LO_HANG = LoHang;
                biz.TON_DAU = TonDau;
                biz.GIA_NHAP = GiaNhap;
                biz.LOGIN_ID = LoginId;
                var result = await biz.Execute();

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
