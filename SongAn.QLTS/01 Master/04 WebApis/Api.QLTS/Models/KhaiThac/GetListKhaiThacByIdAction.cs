using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhaiThac;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.KhaiThac
{
    public class GetListKhaiThacByIdAction
    {
        public string KhaiThacId { get; set; }
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

                GetListKhaiThacByIdBiz biz = new GetListKhaiThacByIdBiz(context);
                biz.KhaiThacId = KhaiThacId;

                IEnumerable<dynamic> TheoDoi = await biz.Execute();

                if (TheoDoi == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy ID '{0}'", KhaiThacId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = TheoDoi
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

            var _KhaiThacId = Protector.Int(KhaiThacId);

            if (_error.code == 0 && _KhaiThacId < 1)
            {
                _error.code = 1;
                _error.message = "KhaiThacID is empty";
            }
            

            return _error;
        }
    }
}
