
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.LoaiXe
{
    public class GetLoaiXeByIdAction
    {
        public string LoaiXeId { get; set; }
        public string MaLoaiXe { get; set; }

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
                var _LoaiXeId = Protector.Int(LoaiXeId);

                var repo = new LoaiXeRepository(context);
                var LoaiXe = await repo.GetById(_LoaiXeId);

                if (LoaiXe == null)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy LoaiXeId '{0}'", _LoaiXeId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = LoaiXe
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

            var _LoaiXeId = Protector.Int(LoaiXeId);

            if (_error.code == 0 && _LoaiXeId < 1)
            {
                _error.code = 1;
                _error.message = "LoaiXeId is empty";
            }

            return _error;
        }
    }
}
