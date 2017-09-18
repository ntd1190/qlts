
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.DuAn
{
    public class InsertDuAnAction : SongAn.QLTS.Entity.QLTS.Entity.DuAn
    {

        #region public
        /*public string MaDuAn { get; set; }
        public string TenDuAn { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var DuAn = new SongAn.QLTS.Entity.QLTS.Entity.DuAn();
                DuAn.MaDuAn = MaDuAn;
                DuAn.TenDuAn = TenDuAn;
                DuAn.GhiChu = GhiChu;
                DuAn.NgungTheoDoi = NgungTheoDoi;
                DuAn.CoSoId = CoSoId;
                DuAn.NguoiTao = NguoiTao;
                DuAn.NgayTao = DateTime.Now;
                DuAn.CtrVersion = 1;
                DuAnRepository repo = new DuAnRepository(context);
                await repo.Insert(DuAn);

                return returnActionResult(HttpStatusCode.OK, DuAn, null);
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
            if (string.IsNullOrEmpty(MaDuAn))
            {
                throw new FormatException("MaDuAn không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenDuAn))
            {
                throw new FormatException("MaDuAn không hợp lệ");
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
