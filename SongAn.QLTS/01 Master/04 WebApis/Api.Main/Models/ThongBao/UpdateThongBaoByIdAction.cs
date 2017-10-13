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
    public class UpdateThongBaoByIdAction
    {
        public string ThongBaoId { get; set; }

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

                UpdateThongBaoByIdBiz biz = new UpdateThongBaoByIdBiz(context);
                biz.ThongBaoId = Protector.Int(ThongBaoId);

                var ThongBao = await biz.Execute();
                if (ThongBao == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy ThongBaoId '{0}'", ThongBaoId));
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

            var _ThongBaoId = Protector.Int(ThongBaoId);

            if (_error.code == 0 && _ThongBaoId < 1)
            {
                _error.code = 1;
                _error.message = "_ThongBaoId is empty";
            }

            return _error;
        }
    }
}
