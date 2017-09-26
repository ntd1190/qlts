using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.SuDung;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.SuDung
{
    public class GetListSuDungByIdAction
    {
        public string SuDungId { get; set; }
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

                GetListSuDungByIdBiz biz = new GetListSuDungByIdBiz(context);
                biz.SuDungId = Protector.String(SuDungId);

                IEnumerable<dynamic> SuDung = await biz.Execute();

                if (SuDung == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy SuDungId '{0}'", SuDungId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = SuDung
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

            var _SuDungId = Protector.Int(SuDungId);

            if (_error.code == 0 && _SuDungId < 1)
            {
                _error.code = 1;
                _error.message = "_SuDungId is empty";
            }

            return _error;
        }
    }
}
