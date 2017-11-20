using SongAn.QLKD.Biz.QLKD.DonHang;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.DonHang
{
    public class GetListDonHangChiTietByDonHangIdAction
    {
        public string DonHangId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                /* kiểm tra input */
                var _error = validate();

                if (_error.code > 0)
                {
                    return returnActionError(HttpStatusCode.BadRequest, _error.message);
                }

                /* convert input */
                GetListDonHangChiTietByDonHangIdBiz biz = new GetListDonHangChiTietByDonHangIdBiz(context);
                biz.DonHangId = DonHangId;
                IEnumerable<dynamic> DonHang = await biz.Execute();

                if (DonHang == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy DonHangId '{0}'", DonHangId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = DonHang
                };

                return _result;
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

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

        private dynamic validate()
        {
            dynamic _error = new System.Dynamic.ExpandoObject();

            _error.code = 0;
            _error.message = string.Empty;

            var _DonHangIdId = Protector.Int(DonHangId);

            if (_error.code == 0 && _DonHangIdId < 1)
            {
                _error.code = 1;
                _error.message = "DonHangId is empty";
            }

            return _error;
        }
    }
}
