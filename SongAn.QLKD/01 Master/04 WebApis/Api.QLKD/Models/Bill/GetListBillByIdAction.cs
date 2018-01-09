using SongAn.QLKD.Biz.QLKD.Bill;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.Bill
{
    public class GetListBillByIdAction
    {
        public string BillId { get; set; }

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
                GetListBillByIdBiz biz = new GetListBillByIdBiz(context);
                biz.BillId = BillId;
                IEnumerable<dynamic> Bill = await biz.Execute();

                if (Bill == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy BillId '{0}'", BillId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = Bill
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

            var _BillId = Protector.Int(BillId);

            if (_error.code == 0 && _BillId < 1)
            {
                _error.code = 1;
                _error.message = "BillId is empty";
            }

            return _error;
        }
    }
}
