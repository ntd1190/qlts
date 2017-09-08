
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.HienTrangSuDung
{
    public class GetHienTrangSuDungByIdAction
    {
        public string HienTrangSuDungId { get; set; }
        public string MaHienTrangSuDung { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                /* kiểm tra input */
                var _error = validate();

                if (_error.code > 0)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, _error.message);
                }

                /* convert input */
                var _HienTrangSuDungId = Protector.Int(HienTrangSuDungId);

                var repo = new HienTrangSuDungRepository(context);
                var HienTrangSuDung = await repo.GetById(_HienTrangSuDungId);

                if (HienTrangSuDung == null)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy HienTrangSuDungId '{0}'", _HienTrangSuDungId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = HienTrangSuDung
                };

                return _result;
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private dynamic validate()
        {
            dynamic _error = new System.Dynamic.ExpandoObject();

            _error.code = 0;
            _error.message = string.Empty;

            var _HienTrangSuDungId = Protector.Int(HienTrangSuDungId);

            if (_error.code == 0 && _HienTrangSuDungId < 1)
            {
                _error.code = 1;
                _error.message = "HienTrangSuDungId is empty";
            }

            return _error;
        }
    }
}
