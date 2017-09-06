using SongAn.QLDN.Biz.QLNS.CongViec;
using SongAn.QLDN.Data.QLNS.CongViec;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
namespace SongAn.QLDN.Api.QLNS.Models.CongViec
{
    public class GetCongViecByIdAction
    {
        public string CongViecId { get; set; }

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
                var _CongViecId = Protector.Int(CongViecId);
                GetListCongViecByIdDac biz = new GetListCongViecByIdDac(context);
                biz.CongViecId = CongViecId;
                var CongViec = await biz.Execute();
                if (CongViec == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy CongViecId '{0}'", _CongViecId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = CongViec
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

            var _CongViecId = Protector.Int(CongViecId);

            if (_error.code == 0 && _CongViecId < 1)
            {
                _error.code = 1;
                _error.message = "CongViecId is empty";
            }

            return _error;
        }
    }
}
