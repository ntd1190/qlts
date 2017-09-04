
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NhomTaiSan
{
    public class InsertNhomTaiSanAction : SongAn.QLTS.Entity.QLTS.Entity.NhomTaiSan
    {

        #region public
        /*public string MaNhomTaiSan { get; set; }
        public string TenNhomTaiSan { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NhomTaiSan = new SongAn.QLTS.Entity.QLTS.Entity.NhomTaiSan();
                NhomTaiSan.MaNhom = MaNhom;
                NhomTaiSan.TenNhom = TenNhom;
                NhomTaiSan.GhiChu = GhiChu;
                NhomTaiSan.NguoiTao = NguoiTao;
                NhomTaiSan.NgayTao = DateTime.Now;
                NhomTaiSan.CtrVersion = 1;
                NhomTaiSanRepository repo = new NhomTaiSanRepository(context);
                await repo.Insert(NhomTaiSan);

                return returnActionResult(HttpStatusCode.OK, NhomTaiSan, null);
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
            if (string.IsNullOrEmpty(MaNhom))
            {
                throw new FormatException("MaNhomTaiSan không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenNhom))
            {
                throw new FormatException("MaNhomTaiSan không hợp lệ");
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
