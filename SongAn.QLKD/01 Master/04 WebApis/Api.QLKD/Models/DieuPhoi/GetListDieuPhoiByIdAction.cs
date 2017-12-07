using SongAn.QLKD.Biz.QLKD.DieuPhoi;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.DieuPhoi
{
    public class GetListDieuPhoiByIdAction
    {
        public string DieuPhoiId { get; set; }

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
                GetListDieuPhoiByIdBiz biz = new GetListDieuPhoiByIdBiz(context);
                biz.DieuPhoiId = DieuPhoiId;
                IEnumerable<dynamic> DieuPhoi = await biz.Execute();

                if (DieuPhoi == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy DieuPhoiId '{0}'", DieuPhoiId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = DieuPhoi
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

            var _DieuPhoiId = Protector.Int(DieuPhoiId);

            if (_error.code == 0 && _DieuPhoiId < 1)
            {
                _error.code = 1;
                _error.message = "DieuPhoiId is empty";
            }

            return _error;
        }
    }
}
