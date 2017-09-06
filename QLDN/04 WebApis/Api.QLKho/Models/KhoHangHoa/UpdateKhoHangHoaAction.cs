using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoHangHoa
{
    public class UpdateKhoHangHoaAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa
    {
        private int _HoaDonId;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result  = new ActionResultDto();

                var repo = new KhoHangHoaRepository(context);
            await repo.UpdatePartial(this,
                nameof(MaHangHoa),
                nameof(TenHangHoa),
                nameof(TuKhoa),
                nameof(DonViTinh),
                nameof(GiaMua),
                nameof(GiaBan),
                nameof(ThueMua),
                nameof(ThueBan),
                nameof(CauHinh),
                nameof(Hinh),
                nameof(ThoiGianBaoHanh),
                nameof(NhomHangHoaId),
                nameof(LoaiHangHoaId),
                nameof(NhaCungCapId),
                nameof(HangSanXuatId),
                nameof(NuocSanXuatId),
                nameof(MoTa),
                nameof(GhiChu)
                 );
                result.ReturnCode = HttpStatusCode.OK;
                result.ReturnData = new
                {
                    data = this
                };
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoHangHoa", HangHoaId, "Update", NguoiTao);
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
            var _id = Protector.Int(HangHoaId);

            if (_id < 1)
            {
                throw new FormatException("HangHoaId is empty");
            }
        }

        private void init()
        {
            _HoaDonId = Protector.Int(HangHoaId);
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
