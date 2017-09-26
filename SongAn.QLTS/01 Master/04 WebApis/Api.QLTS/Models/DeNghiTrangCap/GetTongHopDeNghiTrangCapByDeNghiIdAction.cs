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
    public class GetTongHopDeNghiTrangCapByDeNghiIdAction
    {
        public string DeNghiId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
               

                GetTongHopDeNghiTrangCapByDeNghiIdBiz biz = new GetTongHopDeNghiTrangCapByDeNghiIdBiz(context);
                biz.DeNghiId =DeNghiId.Replace("-",",");

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

    }
}
