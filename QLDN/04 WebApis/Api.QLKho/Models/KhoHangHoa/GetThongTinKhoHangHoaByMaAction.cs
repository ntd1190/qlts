using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoHangHoa
{
    public class GetThongTinKhoHangHoaByMaAction
    {
        public string MaHangHoa { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {

                Data.QLKho.KhoHangHoa.GetListKhoHangHoaByMaTenDac dac = new Data.QLKho.KhoHangHoa.GetListKhoHangHoaByMaTenDac(context);
                dac.MaHangHoa = MaHangHoa;
                var KhoHangHoa = await dac.Execute();
                if (KhoHangHoa == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy KhoHangHoa");
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KhoHangHoa
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



    }
}
