
using SongAn.QLKD.Data.Repository.QLKD;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLKD.Api.QLKD.Models.NhomKinhDoanh
{
    public class GetNhomKinhDoanhByIdAction
    {
        public string NhomKinhDoanhId { get; set; }

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
                var _NhomKinhDoanhId = Protector.Int(NhomKinhDoanhId);

                var repo = new NhomKinhDoanhRepository(context);
                var NhomKinhDoanh = await repo.GetById(_NhomKinhDoanhId);

                if (NhomKinhDoanh == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NhomKinhDoanhId '{0}'", _NhomKinhDoanhId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = NhomKinhDoanh
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

            var _NhomKinhDoanhId = Protector.Int(NhomKinhDoanhId);

            if (_error.code == 0 && _NhomKinhDoanhId < 1)
            {
                _error.code = 1;
                _error.message = "NhomKinhDoanhId is empty";
            }

            return _error;
        }
    }
}
