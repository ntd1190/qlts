
using SongAn.QLTS.Biz.QLTS.LoaiTaiSan;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.LoaiTaiSan
{
    public class GetLoaiTaiSanByIdAction
    {
        public string LoaiId { get; set; }
        public string MaLoaiTaiSan { get; set; }

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
                GetLoaiTaiSanByIdBiz biz = new GetLoaiTaiSanByIdBiz(context);
                biz.LoaiId = LoaiId;
                IEnumerable<dynamic> LoaiTaiSan = await biz.Execute();

                if (LoaiTaiSan == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy LoaiId '{0}'", LoaiId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = LoaiTaiSan
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

            var _LoaiId = Protector.Int(LoaiId);

            if (_error.code == 0 && _LoaiId < 1)
            {
                _error.code = 1;
                _error.message = "LoaiId is empty";
            }

            return _error;
        }
    }
}
