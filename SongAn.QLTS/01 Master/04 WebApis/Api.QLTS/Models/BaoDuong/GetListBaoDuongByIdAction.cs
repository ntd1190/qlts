using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.BaoDuong;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.BaoDuong
{
    public class GetListBaoDuongByIdAction
    {
        public string BaoDuongId { get; set; }
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

                GetListBaoDuongByIdBiz biz = new GetListBaoDuongByIdBiz(context);
                biz.BaoDuongId = Protector.String(BaoDuongId);

                IEnumerable<dynamic> BaoDuong = await biz.Execute();

                if (BaoDuong == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy BaoDuongId '{0}'", BaoDuongId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = BaoDuong
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

            var _BaoDuongId = Protector.Int(BaoDuongId);

            if (_error.code == 0 && _BaoDuongId < 1)
            {
                _error.code = 1;
                _error.message = "_BaoDuongId is empty";
            }

            return _error;
        }
    }
}
