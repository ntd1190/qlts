using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Util.Common.CustomException;

namespace SongAn.QLDN.Api.QLKho.Models.KhoLoaiHangHoa
{
    public class UpdateKhoLoaiHangHoaAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoLoaiHangHoa
    {
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {

                var repo = new KhoLoaiHangHoaRepository(context);
                var result = await repo.UpdatePartial(this,
                     nameof(MaLoai),
                     nameof(TenLoai),
                     nameof(MoTa)
                      );

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, metaData);
            }
            catch (BaseException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        private void validate()
        {
            var _id = Protector.Int(LoaiHangHoaId);

            if (_id < 1)
            {
                throw new FormatException("LoaiHangHoaId is empty");
            }
        }

        private void init() { }

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

        private ActionResultDto returnActionResult(object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = HttpStatusCode.OK;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
    }
}
