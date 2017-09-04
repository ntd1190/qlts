
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSamChiTiet
{
    public class GetKeHoachMuaSamChiTietByIdAction
    {
        public string MuaSamChiTietId { get; set; }
        public string MaKeHoachMuaSamChiTiet { get; set; }

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
                var _MuaSamChiTietId = Protector.Int(MuaSamChiTietId);

                var repo = new KeHoachMuaSamChiTietRepository(context);
                var KeHoachMuaSamChiTiet = await repo.GetById(_MuaSamChiTietId);

                if (KeHoachMuaSamChiTiet == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy MuaSamChiTietId '{0}'", _MuaSamChiTietId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KeHoachMuaSamChiTiet
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

            var _MuaSamChiTietId = Protector.Int(MuaSamChiTietId);

            if (_error.code == 0 && _MuaSamChiTietId < 1)
            {
                _error.code = 1;
                _error.message = "MuaSamChiTietId is empty";
            }

            return _error;
        }
    }
}
