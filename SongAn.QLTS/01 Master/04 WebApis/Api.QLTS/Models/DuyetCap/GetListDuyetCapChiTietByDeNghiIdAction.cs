using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DuyetCap;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DuyetCap
{
    public class GetListDuyetCapChiTietByDeNghiIdAction
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

                GetListDuyetCapChiTietByDeNghiIdBiz biz = new GetListDuyetCapChiTietByDeNghiIdBiz(context);
                biz.DeNghiId = Protector.String(DeNghiId);

                IEnumerable<dynamic> DeNghiMuaSamChiTiet = await biz.Execute();

                if (DeNghiMuaSamChiTiet == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy DeNghiId '{0}'", DeNghiId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = DeNghiMuaSamChiTiet
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

            var _MuaSamId = Protector.Int(DeNghiId);

            if (_error.code == 0 && _MuaSamId < 1)
            {
                _error.code = 1;
                _error.message = "DeNghiId is empty";
            }

            return _error;
        }
    }
}
