using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;

namespace  SongAn.QLTS.Api.QLTS.Models.NhanVien
{
    public class UpdateNhanVienAction : SongAn.QLTS.Entity.QLTS.Entity.NhanVien
    {
        private int _NhanVienId;
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new NhanVienRepository(context);
            await repo.UpdatePartial(this,
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.MaNhanVien),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.TenNhanVien),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.DienThoai),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.PhongBanId),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.ChucDanh),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.Email),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.DiaChi),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhanVien.GhiChu)
                 );
            result.data = this;
            return returnActionResult(HttpStatusCode.OK, result.data, null);
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
            var _id = Protector.Int(NhanVienId);

            if (_id < 1)
            {
                throw new FormatException("NhanVienId is empty");
            }
        }

        private void init()
        {
            _NhanVienId = Protector.Int(NhanVienId);
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

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
    }
}
