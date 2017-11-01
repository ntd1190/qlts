using SongAn.QLTS.Data.Repository.QLTS_MAIN;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using SongAn.QLTS.Util.Common.Helper;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.NguoiDung
{
    public class UpdateNguoiDungAction : SongAn.QLTS.Entity.QLTS_MAIN.Entity.NguoiDung
    {
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {

                dynamic result = new System.Dynamic.ExpandoObject();
                var repo = new NguoiDungRepository(context);

                if (PasswordHash != "" && PasswordHash != null)
                {
                    PasswordHash = HashHelper.getHashSha256(PasswordHash);
                    repo.UpdatePartial(this,
                   nameof(MaNguoiDung),
                   nameof(HoTen),
                   nameof(VaiTroId),
                   nameof(NhanVienId),
                   nameof(PasswordHash),
                   nameof(CoSoId),
                   nameof(Email),
                   nameof(DienThoai)
                 );
                }
                else
                {
                    repo.UpdatePartial(this,
                   nameof(MaNguoiDung),
                   nameof(HoTen),
                   nameof(VaiTroId),
                   nameof(NhanVienId),
                   nameof(CoSoId),
                   nameof(Email),
                   nameof(DienThoai)
                 );
                }
                result.data = this;
                return returnActionResult(this, null);
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
            var _id = Protector.Int(NguoiDungId);

            if (_id < 1)
            {
                throw new FormatException("NguoiDungId is empty");
            }
        }

        private void init()
        {

            _CtrVersion = Protector.Int(CtrVersion);
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
