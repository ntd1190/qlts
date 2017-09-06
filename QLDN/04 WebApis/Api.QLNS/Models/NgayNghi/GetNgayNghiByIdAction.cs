using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Globalization;

namespace  SongAn.QLDN.Api.QLNS.Models.NgayNghi
{
    public class GetNgayNghiByIdAction
    {
        public string NgayNghiId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
 

                /* convert input */
                var _NgayNghiId = DateTime.ParseExact(NgayNghiId, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));

                var repo = new NgayNghiRepository(context);
                var NgayNghi = await repo.GetById(_NgayNghiId);

                if (NgayNghi == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NgayNghiId '{0}'", _NgayNghiId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = NgayNghi
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


    }
}
