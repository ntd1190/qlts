using SongAn.QLDN.Biz.QLNS.NguoiDung;
using SongAn.QLDN.Data.QLNS.NguoiDung;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
namespace SongAn.QLDN.Api.QLNS.Models.NguoiDung
{
    public class GetNguoiDungByIdAction
    {
        public string NguoiDungId { get; set; }

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
                var _NguoiDungId = Protector.Int(NguoiDungId);
                GetListNguoiDungByIdDac biz = new GetListNguoiDungByIdDac(context);
                biz.NguoiDungId = NguoiDungId;
                var NguoiDung = await biz.Execute();
                if (NguoiDung == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NguoiDungId '{0}'", _NguoiDungId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = NguoiDung
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

            var _NguoiDungId = Protector.Int(NguoiDungId);

            if (_error.code == 0 && _NguoiDungId < 1)
            {
                _error.code = 1;
                _error.message = "NguoiDungId is empty";
            }

            return _error;
        }
    }
}
