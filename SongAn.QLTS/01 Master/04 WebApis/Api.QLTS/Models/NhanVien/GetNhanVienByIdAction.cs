
using SongAn.QLTS.Biz.QLTS.NhanVien;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.NhanVien
{
    public class GetNhanVienByIdAction
    {
        public string NhanVienId { get; set; }
        public string MaNhanVien { get; set; }

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
                GetNhanVienByIdBiz biz = new GetNhanVienByIdBiz(context);
                biz.NhanVienId = NhanVienId;
                IEnumerable<dynamic> NhanVien = await biz.Execute();

                if (NhanVien == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NhanVienId '{0}'", NhanVienId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = NhanVien
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
