using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.BienBanKiemKe;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.BienBanKiemKe
{
    public class GetListBienBanKiemKeChiTietByKiemKeIdAction
    {
        public string KiemKeId { get; set; }
        public string PhongBanId { get; set; }
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

                GetListBienBanKiemKeChiTietByKiemKeIdBiz biz = new GetListBienBanKiemKeChiTietByKiemKeIdBiz(context);
                biz.BienBanKiemKeId = Protector.Int(KiemKeId);
                biz.PhongBanId = Protector.Int(PhongBanId);

                IEnumerable<dynamic> KiemKe = await biz.Execute();

                if (KiemKe == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy KiemKeId '{0}'", KiemKeId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KiemKe
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

            var _KiemKeId = Protector.Int(KiemKeId);
            var _PhongBanId = Protector.Int(PhongBanId);

            if (_error.code == 0 && _KiemKeId < 1 && _PhongBanId < 1)
            {
                _error.code = 1;
                _error.message = "_KiemKeId is empty";
            }

            return _error;
        }
    }
}
