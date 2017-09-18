
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.NhomTaiSan
{
    public class GetNhomTaiSanByIdAction
    {
        public string NhomTaiSanId { get; set; }
        public string MaNhomTaiSan { get; set; }

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
                var _NhomTaiSanId = Protector.Int(NhomTaiSanId);

                var repo = new NhomTaiSanRepository(context);
                var NhomTaiSan = await repo.GetById(_NhomTaiSanId);

                if (NhomTaiSan == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NhomTaiSanId '{0}'", _NhomTaiSanId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = NhomTaiSan
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

            var _NhomTaiSanId = Protector.Int(NhomTaiSanId);

            if (_error.code == 0 && _NhomTaiSanId < 1)
            {
                _error.code = 1;
                _error.message = "NhomTaiSanId is empty";
            }

            return _error;
        }
    }
}
