using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.GhiTang;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.GhiTang
{
    public class GetListGhiTangByGhiTangIdAction
    {
        public string GhiTangId { get; set; }
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

                GetListGhiTangByGhiTangIdBiz biz = new GetListGhiTangByGhiTangIdBiz(context);
                biz.GhiTangId = Protector.String(GhiTangId);

                IEnumerable<dynamic> GhiTang = await biz.Execute();

                if (GhiTang == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy GhiTangId '{0}'", GhiTangId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = GhiTang
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

            var _MuaSamId = Protector.Int(GhiTangId);

            if (_error.code == 0 && _MuaSamId < 1)
            {
                _error.code = 1;
                _error.message = "GhiTangId is empty";
            }

            return _error;
        }
    }
}
