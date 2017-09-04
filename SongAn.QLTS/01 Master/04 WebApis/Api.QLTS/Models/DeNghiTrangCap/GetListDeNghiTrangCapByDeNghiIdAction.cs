using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DeNghiTrangCap;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DeNghiTrangCap
{
    public class GetListDeNghiTrangCapByDeNghiIdAction
    {
        public string DeNghiId { get; set; }
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

                GetListTrangCapDeNghiByDeNghiIdBiz biz = new GetListTrangCapDeNghiByDeNghiIdBiz(context);
                biz.DeNghiId = Protector.String(DeNghiId);

                IEnumerable<dynamic> DeNghiTrangCap = await biz.Execute();

                if (DeNghiTrangCap == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy DeNghiId '{0}'", DeNghiId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = DeNghiTrangCap
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

            var _DeNghiId = Protector.Int(DeNghiId);

            if (_error.code == 0 && _DeNghiId < 1)
            {
                _error.code = 1;
                _error.message = "DeNghiId is empty";
            }

            return _error;
        }
    }
}
