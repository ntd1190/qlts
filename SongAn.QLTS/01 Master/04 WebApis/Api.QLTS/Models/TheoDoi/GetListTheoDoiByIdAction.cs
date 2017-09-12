using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.TheoDoi;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.TheoDoi
{
    public class GetListTheoDoiByIdAction
    {
        public string TaiSanId { get; set; }
        public string PhongBanId { get; set; }
        public string NhanVienId { get; set; }
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

                GetListTheoDoiByIdBiz biz = new GetListTheoDoiByIdBiz(context);
                biz.TaiSanId = Protector.Int(TaiSanId);
                biz.PhongBanId = Protector.Int(PhongBanId);
                biz.NhanVienId = Protector.Int(NhanVienId);

                IEnumerable<dynamic> TheoDoi = await biz.Execute();

                if (TheoDoi == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy ID '{0}'", TaiSanId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = TheoDoi
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

            var _TaiSanId = Protector.Int(TaiSanId);

            if (_error.code == 0 && _TaiSanId < 1)
            {
                _error.code = 1;
                _error.message = "TaiSanId is empty";
            }
            var _PhongBanId = Protector.Int(PhongBanId);

            if (_error.code == 0 && _PhongBanId < 1)
            {
                _error.code = 1;
                _error.message = "PhongBanId is empty";
            }
            var _NhanVienId = Protector.Int(NhanVienId);

            if (_error.code == 0 && _NhanVienId < 1)
            {
                _error.code = 1;
                _error.message = "NhanVienId is empty";
            }

            return _error;
        }
    }
}
