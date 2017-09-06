using SongAn.QLDN.Biz.QLNS.DuAn;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.DuAn
{
    public class GetDuAnByIdAction
    {
        public string DuAnId { get; set; }

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
                var _DuAnId = Protector.Int(DuAnId);
                GetListDuAnByIdBiz biz = new GetListDuAnByIdBiz(context);
                biz.DuAn = DuAnId;
                var DuAn = await biz.Execute();

                if (DuAn == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy DuAnId '{0}'", _DuAnId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = DuAn
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

            var _DuAnId = Protector.Int(DuAnId);

            if (_error.code == 0 && _DuAnId < 1)
            {
                _error.code = 1;
                _error.message = "DuAnId is empty";
            }

            return _error;
        }
    }
}
