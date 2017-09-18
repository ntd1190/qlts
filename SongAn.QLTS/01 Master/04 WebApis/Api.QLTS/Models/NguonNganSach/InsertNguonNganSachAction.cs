
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NguonNganSach
{
    public class InsertNguonNganSachAction : SongAn.QLTS.Entity.QLTS.Entity.NguonNganSach
    {

        #region public
        /*public string MaNguonNganSach { get; set; }
        public string TenNguonNganSach { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NguonNganSach = new SongAn.QLTS.Entity.QLTS.Entity.NguonNganSach();
                NguonNganSach.MaNguonNganSach = MaNguonNganSach;
                NguonNganSach.TenNguonNganSach = TenNguonNganSach;
                NguonNganSach.GhiChu = GhiChu;
                NguonNganSach.NguoiTao = NguoiTao;
                NguonNganSach.NgayTao = DateTime.Now;
                NguonNganSach.CtrVersion = 1;
                NguonNganSachRepository repo = new NguonNganSachRepository(context);
                await repo.Insert(NguonNganSach);

                return returnActionResult(HttpStatusCode.OK, NguonNganSach, null);
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

        private void init() { }

        private void validate()
        {
            if (string.IsNullOrEmpty(MaNguonNganSach))
            {
                throw new FormatException("MaNguonNganSach không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenNguonNganSach))
            {
                throw new FormatException("MaNguonNganSach không hợp lệ");
            }
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
