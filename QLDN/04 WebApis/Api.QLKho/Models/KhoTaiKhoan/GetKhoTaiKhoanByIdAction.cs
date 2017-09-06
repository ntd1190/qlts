using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoTaiKhoan
{
    public class GetKhoTaiKhoanByIdAction
    {
        public string KhoTaiKhoanId { get; set; }
        public string MaKhoTaiKhoan { get; set; }

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
                var _KhoTaiKhoanId = Protector.Int(KhoTaiKhoanId);

                var repo = new KhoTaiKhoanRepository(context);
                var KhoTaiKhoan = await repo.GetById(_KhoTaiKhoanId);

                if (KhoTaiKhoan == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy KhoTaiKhoanId '{0}'", _KhoTaiKhoanId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KhoTaiKhoan
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

            var _KhoTaiKhoanId = Protector.Int(KhoTaiKhoanId);

            if (_error.code == 0 && _KhoTaiKhoanId < 1)
            {
                _error.code = 1;
                _error.message = "KhoTaiKhoanId is empty";
            }

            return _error;
        }
    }
}
