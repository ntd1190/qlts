
using SongAn.QLTS.Biz.QLTS.LapBaoCao;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.LapBaoCao
{
    public class GetLapBaoCaoByIdAction
    {
        public string LapBaoCaoId { get; set; }

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

                GetLapBaoCaoByIdBiz biz = new GetLapBaoCaoByIdBiz(context);
                biz.LapBaoCaoId = LapBaoCaoId;
                IEnumerable<dynamic> LapBaoCaoChiTiet = await biz.Execute();

                if (LapBaoCaoChiTiet == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy LapBaoCaoId '{0}'", LapBaoCaoId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = LapBaoCaoChiTiet
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

            var _LapBaoCaoId = Protector.Int(LapBaoCaoId);

            if (_error.code == 0 && _LapBaoCaoId < 1)
            {
                _error.code = 1;
                _error.message = "LapBaoCaoId is empty";
            }

            return _error;
        }
    }
}
