using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoNuocSanXuat
{
    public class GetKhoNuocSanXuatByIdAction
    {
        public string KhoNuocSanXuatId { get; set; }
        public string MaKhoNuocSanXuat { get; set; }

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
                var _KhoNuocSanXuatId = Protector.Int(KhoNuocSanXuatId);

                var repo = new KhoNuocSanXuatRepository(context);
                var KhoNuocSanXuat = await repo.GetById(_KhoNuocSanXuatId);

                if (KhoNuocSanXuat == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy KhoNuocSanXuatId '{0}'", _KhoNuocSanXuatId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = KhoNuocSanXuat
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

            var _KhoNuocSanXuatId = Protector.Int(KhoNuocSanXuatId);

            if (_error.code == 0 && _KhoNuocSanXuatId < 1)
            {
                _error.code = 1;
                _error.message = "KhoNuocSanXuatId is empty";
            }

            return _error;
        }
    }
}
