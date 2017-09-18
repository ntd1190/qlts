
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.KhoTaiSan
{
    public class InsertKhoTaiSanAction : SongAn.QLTS.Entity.QLTS.Entity.KhoTaiSan
    {

        #region public
        /*public string MaKhoTaiSan { get; set; }
        public string TenKhoTaiSan { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var KhoTaiSan = new SongAn.QLTS.Entity.QLTS.Entity.KhoTaiSan();
                KhoTaiSan.MaKhoTaiSan = MaKhoTaiSan;
                KhoTaiSan.TenKhoTaiSan = TenKhoTaiSan;
                KhoTaiSan.GhiChu = GhiChu;
                KhoTaiSan.CoSoId = CoSoId;
                KhoTaiSan.NguoiTao = NguoiTao;
                KhoTaiSan.NgayTao = DateTime.Now;
                KhoTaiSan.CtrVersion = 1;
                KhoTaiSanRepository repo = new KhoTaiSanRepository(context);
                await repo.Insert(KhoTaiSan);

                return returnActionResult(HttpStatusCode.OK, KhoTaiSan, null);
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
            if (string.IsNullOrEmpty(MaKhoTaiSan))
            {
                throw new FormatException("MaKhoTaiSan không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenKhoTaiSan))
            {
                throw new FormatException("MaKhoTaiSan không hợp lệ");
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
