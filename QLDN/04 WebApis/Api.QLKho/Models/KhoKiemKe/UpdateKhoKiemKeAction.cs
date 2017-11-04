using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;

namespace SongAn.QLDN.Api.QLKho.Models.KhoKiemKe
{
    public class UpdateKhoKiemKeAction : Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe
    {
        private int _HoaDonId;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new ActionResultDto();

                var repo = new KhoKiemKeRepository(context);
                await repo.UpdatePartial(this,
                nameof(NgayTao),
                nameof(TieuDe),
                nameof(KhoHangId),
                nameof(Hinh),
                nameof(TruongBanTen),
                nameof(TruongBanChucVu),
                nameof(TruongBanDaiDien),
                nameof(UyVienTen),
                nameof(UyVienChucVu),
                nameof(UyVienDaiDien),
                nameof(UyVienTen2),
                nameof(UyVienChucVu2),
                nameof(UyVienDaiDien2),
                nameof(TrangThai));
                result.ReturnCode = HttpStatusCode.OK;
                result.ReturnData = new
                {
                    data = this
                };
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoKiemKe", KiemKeId, "Update", int.Parse(NguoiTao.ToString()));
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
            var _id = Protector.Int(KiemKeId);

            if (_id < 1)
            {
                throw new FormatException("KiemKeId is empty");
            }
        }

        private void init()
        {
            _HoaDonId = Protector.Int(KiemKeId);
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
