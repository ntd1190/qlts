
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.HangSanXuat
{
    public class GetHangSanXuatByIdAction
    {
        public string HangSanXuatId { get; set; }
        public string MaHangSanXuat { get; set; }

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
                var _HangSanXuatId = Protector.Int(HangSanXuatId);

                var repo = new HangSanXuatRepository(context);
                var HangSanXuat = await repo.GetById(_HangSanXuatId);

                if (HangSanXuat == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy HangSanXuatId '{0}'", _HangSanXuatId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = HangSanXuat
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

            var _HangSanXuatId = Protector.Int(HangSanXuatId);

            if (_error.code == 0 && _HangSanXuatId < 1)
            {
                _error.code = 1;
                _error.message = "HangSanXuatId is empty";
            }

            return _error;
        }
    }
}
