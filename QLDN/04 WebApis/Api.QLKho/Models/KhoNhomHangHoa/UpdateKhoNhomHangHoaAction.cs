using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoNhomHangHoa
{
    public class UpdateKhoNhomHangHoaAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoNhomHangHoa
    {
        private int _phongbanId;
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new KhoNhomHangHoaRepository(context);
            await repo.UpdatePartial(this,
                nameof(MaNhom),
                nameof(TenNhom),
                nameof(MoTa)
                 );
            result.data = this;
            return result;
            }
            catch (FormatException ex)
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
            var _id = Protector.Int(NhomHangHoaId);

            if (_id < 1)
            {
                throw new FormatException("NhomHangHoaId is empty");
            }
        }

        private void init()
        {
            _phongbanId = Protector.Int(NhomHangHoaId);
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
