using SongAn.QLTS.Biz.Main.ThongBao;
using SongAn.QLTS.Data.Repository.QLTS_MAIN;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.ThongBao
{
    public class GetListThongBaoByCoSoIdAction
    {
        public string CoSoId { get; set; }
        public string UserId { get; set; }

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
               
                GetListThongBaoByCoSoIdBiz biz = new GetListThongBaoByCoSoIdBiz(context);
                biz.CoSoId = Protector.Int(CoSoId);
                biz.UserId = Protector.Int(UserId);

                var ThongBao = await biz.Execute();
                if (ThongBao == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy CoSoId '{0}'", CoSoId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = ThongBao
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
