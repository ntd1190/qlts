
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.HangSanXuat
{
    public class InsertHangSanXuatAction : SongAn.QLTS.Entity.QLTS.Entity.HangSanXuat
    {

        #region public
        /*public string MaHangSanXuat { get; set; }
        public string TenHangSanXuat { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var HangSanXuat = new SongAn.QLTS.Entity.QLTS.Entity.HangSanXuat();
                HangSanXuat.MaHangSanXuat = MaHangSanXuat;
                HangSanXuat.TenHangSanXuat = TenHangSanXuat;
                HangSanXuat.GhiChu = GhiChu;
                HangSanXuat.NguoiTao = NguoiTao;
                HangSanXuat.NgayTao = DateTime.Now;
                HangSanXuat.CtrVersion = 1;
                HangSanXuatRepository repo = new HangSanXuatRepository(context);
                await repo.Insert(HangSanXuat);

                return returnActionResult(HttpStatusCode.OK, HangSanXuat, null);
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
            if (string.IsNullOrEmpty(MaHangSanXuat))
            {
                throw new FormatException("MaHangSanXuat không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenHangSanXuat))
            {
                throw new FormatException("MaHangSanXuat không hợp lệ");
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
