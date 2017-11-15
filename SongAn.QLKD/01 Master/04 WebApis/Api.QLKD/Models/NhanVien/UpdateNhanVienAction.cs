using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Data.Repository.QLKD;
using SongAn.QLKD.Util.Common.Helper;

namespace  SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class UpdateNhanVienAction : SongAn.QLKD.Entity.QLKD.Entity.KDNhanVienChiTiet
    {
        private int _NhanVienId;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new NhanVienChiTietRepository(context);
            await repo.UpdatePartial(this,
                nameof(NhomKinhDoanhId),
                nameof(CachLamViec),
                nameof(TinhCach),
                nameof(SoThich),
                nameof(ThoiQuen),
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
            var _id = Protector.Int(NhanVienId);

            if (_id < 1)
            {
                throw new FormatException("NhanVienId is empty");
            }
        }

        private void init()
        {
            _NhanVienId = Protector.Int(NhanVienId);
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
