
using SongAn.QLTS.Biz.QLTS.CoSo;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.CoSo
{
    public class GetCoSoByIdAction
    {
        public string CoSoId { get; set; }
        public string MaCoSo { get; set; }

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
                GetCoSoByIdBiz biz = new GetCoSoByIdBiz(context);
                biz.CoSoId = CoSoId;
                IEnumerable<dynamic> CoSo = await biz.Execute();

                if (CoSo == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy CoSoId '{0}'", CoSoId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = CoSo
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

            var _CoSoId = Protector.Int(CoSoId);

            if (_error.code == 0 && _CoSoId < 1)
            {
                _error.code = 1;
                _error.message = "CoSoId is empty";
            }

            return _error;
        }
    }
}
