using SongAn.QLKD.Biz.QLKD.ChiTieu;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.ChiTieu
{
    public class GetListChiTieuChiTietByChiTieuIdAction
    {
        public string ChiTieuId { get; set; }

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
                GetListChiTieuChiTietByChiTieuIdBiz biz = new GetListChiTieuChiTietByChiTieuIdBiz(context);
                biz.ChiTieuId = ChiTieuId;
                IEnumerable<dynamic> ChiTieu = await biz.Execute();

                if (ChiTieu == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy ChiTieuId '{0}'", ChiTieuId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = ChiTieu
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

            var _ChiTieuIdId = Protector.Int(ChiTieuId);

            if (_error.code == 0 && _ChiTieuIdId < 1)
            {
                _error.code = 1;
                _error.message = "ChiTieuId is empty";
            }

            return _error;
        }
    }
}
