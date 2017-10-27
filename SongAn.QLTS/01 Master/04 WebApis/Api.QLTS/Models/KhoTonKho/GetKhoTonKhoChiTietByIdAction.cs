
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.KhoTonKho
{
    public class GetKhoTonKhoChiTietByIdAction
    {
        public string TonKhoChiTietId { get; set; }

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
                var _TonKhoChiTietId = Protector.Int(TonKhoChiTietId);

                var repo = new KhoTonKhoChiTietRepository(context);
                var KhoTonKho = await repo.GetById(_TonKhoChiTietId);

                if (KhoTonKho == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy KhoTaiSanId '{0}'", _TonKhoChiTietId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KhoTonKho
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

            var _TonKhoChiTietId = Protector.Int(TonKhoChiTietId);

            if (_error.code == 0 && _TonKhoChiTietId < 1)
            {
                _error.code = 1;
                _error.message = "KhoTaiSanId is empty";
            }

            return _error;
        }
    }
}
