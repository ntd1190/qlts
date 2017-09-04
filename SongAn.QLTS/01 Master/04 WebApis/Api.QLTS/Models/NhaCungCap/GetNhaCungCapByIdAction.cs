
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.NhaCungCap
{
    public class GetNhaCungCapByIdAction
    {
        public string NhaCungCapId { get; set; }
        public string MaNhaCungCap { get; set; }

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
                var _NhaCungCapId = Protector.Int(NhaCungCapId);

                var repo = new NhaCungCapRepository(context);
                var NhaCungCap = await repo.GetById(_NhaCungCapId);

                if (NhaCungCap == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NhaCungCapId '{0}'", _NhaCungCapId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = NhaCungCap
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

            var _NhaCungCapId = Protector.Int(NhaCungCapId);

            if (_error.code == 0 && _NhaCungCapId < 1)
            {
                _error.code = 1;
                _error.message = "NhaCungCapId is empty";
            }

            return _error;
        }
    }
}
