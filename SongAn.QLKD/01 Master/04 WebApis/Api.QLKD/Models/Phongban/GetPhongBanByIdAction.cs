using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLKD.Api.QLKD.Models.Phongban
{
    public class GetPhongBanByIdAction
    {
        public string PhongBanId { get; set; }
        public string MaPhongBan { get; set; }

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
                var _PhongBanId = Protector.Int(PhongBanId);

                var repo = new PhongBanRepository(context);
                var PhongBan = await repo.GetById(_PhongBanId);

                if (PhongBan == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy PhongBanId '{0}'", _PhongBanId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = PhongBan
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

            var _PhongBanId = Protector.Int(PhongBanId);

            if (_error.code == 0 && _PhongBanId < 1)
            {
                _error.code = 1;
                _error.message = "PhongBanId is empty";
            }

            return _error;
        }
    }
}
