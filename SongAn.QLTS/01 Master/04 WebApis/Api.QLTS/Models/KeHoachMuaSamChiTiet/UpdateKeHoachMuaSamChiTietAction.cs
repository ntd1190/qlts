using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;

namespace SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSamChiTiet
{
    public class UpdateKeHoachMuaSamChiTietAction : SongAn.QLTS.Entity.QLTS.Entity.KeHoachMuaSamChiTiet
    {
        private int _MuaSamChiTietId;
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

                var repo = new KeHoachMuaSamChiTietRepository(context);
                await repo.UpdatePartial(this,
                    nameof(MuaSamId),
                    nameof(TenTaiSan),
                    nameof(LoaiId),
                    nameof(PhuongThucId),
                    nameof(DonViTinh),
                    nameof(MoTa),
                    nameof(Ngay),
                    nameof(SoLuong),
                    nameof(DonGia),
                    nameof(HinhThucId),
                    nameof(DuToan),
                    nameof(GhiChu)
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
            var _id = Protector.Int(MuaSamChiTietId);

            if (_id < 1)
            {
                throw new FormatException("MuaSamChiTietId is empty");
            }
        }

        private void init()
        {
            _MuaSamChiTietId = Protector.Int(MuaSamChiTietId);
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
