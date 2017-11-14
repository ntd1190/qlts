using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Data.Repository.QLKD;
using SongAn.QLKD.Util.Common.Helper;

namespace  SongAn.QLKD.Api.QLKD.Models.NhomKinhDoanh
{
    public class UpdateNhomKinhDoanhAction : SongAn.QLKD.Entity.QLKD.Entity.KDNhomKinhDoanh
    {
        private int _NhomKinhDoanhId;
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new NhomKinhDoanhRepository(context);
            await repo.UpdatePartial(this,
                nameof(MaNhomKinhDoanh),
                nameof(TenNhomKinhDoanh),
                nameof(QuanLy),
                nameof(SoLuongNhanVien)
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
            var _id = Protector.Int(NhomKinhDoanhId);

            if (_id < 1)
            {
                throw new FormatException("NhomKinhDoanhId is empty");
            }
        }

        private void init()
        {
            _NhomKinhDoanhId = Protector.Int(NhomKinhDoanhId);
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
