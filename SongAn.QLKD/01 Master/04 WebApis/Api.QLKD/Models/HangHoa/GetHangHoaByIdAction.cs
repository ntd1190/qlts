using SongAn.QLKD.Biz.QLKD.HangHoa;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace SongAn.QLKD.Api.QLKD.Models.HangHoa
{
    public class GetHangHoaByIdAction
    {
        public string HangHoaId { get; set; }
        public string MaHangHoa { get; set; }

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
                GetListHangHoaByIdBiz bix = new GetListHangHoaByIdBiz(context);
                bix.HangHoaId = HangHoaId;
                var KhoHangHoa = await bix.Execute();
                if (KhoHangHoa == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy KhoHangHoaId '{0}'", HangHoaId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KhoHangHoa
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

            var _KhoHangHoaId = Protector.Int(HangHoaId);

            if (_error.code == 0 && _KhoHangHoaId < 1)
            {
                _error.code = 1;
                _error.message = "KhoHangHoaId is empty";
            }

            return _error;
        }
    }
}
