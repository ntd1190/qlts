using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLTS.Data.Repository.QLTS;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.KhoTonKho 
{
    public class UpdateKhoTonKhoAction 
    {
        public string KhoTonKho { get; set; }

        #region private
        private SongAn.QLTS.Entity.QLTS.Entity.KhoTonKhoChiTiet _KhoTonKho;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                    dynamic result = new System.Dynamic.ExpandoObject();
                    var repo = new KhoTonKhoChiTietRepository(context);
                    await repo.UpdatePartial(_KhoTonKho,
                          nameof(_KhoTonKho.GiaMua),
                          nameof(_KhoTonKho.GiaBan),
                          nameof(_KhoTonKho.TonDau),
                          nameof(_KhoTonKho.NguonNganSachId),
                          nameof(_KhoTonKho.NhaCungCapId),
                          nameof(_KhoTonKho.HanDung),
                          nameof(_KhoTonKho.LoSanXuat)
                         );
                    result.data = this;
                    return returnActionResult(HttpStatusCode.OK, result.data, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            var __KhoTonKho = JsonConvert.DeserializeObject<dynamic>(KhoTonKho);

            KhoTonKho = JsonConvert.SerializeObject(__KhoTonKho);
            _KhoTonKho = JsonConvert.DeserializeObject<SongAn.QLTS.Entity.QLTS.Entity.KhoTonKhoChiTiet>(KhoTonKho);


        }

        private void validate()
        {

        }

        #region helpers
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
        #endregion
    }
}
